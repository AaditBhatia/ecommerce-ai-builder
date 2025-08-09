'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Palette, Globe, Check, ArrowRight, Brain, Package, Users, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { AIAnalysisService, CompleteAnalysis } from '@/lib/ai-prompts';
import GenerationProgress from '@/components/GenerationProgress';

const steps = [
  { id: 1, name: 'Analysis', icon: Brain },
  { id: 2, name: 'Preferences', icon: Palette },
  { id: 3, name: 'Generate', icon: Globe },
];

export default function GeneratePage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [analysis, setAnalysis] = useState<CompleteAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // User preferences
  const [storeName, setStoreName] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [colorScheme, setColorScheme] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [siteUrl, setSiteUrl] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Get the user's prompt and analysis answers from localStorage
    const prompt = localStorage.getItem('userPrompt');
    const analysisAnswers = localStorage.getItem('analysisAnswers');

    if (prompt) {
      setUserPrompt(prompt);

      // Enhance analysis with questionnaire answers
      if (analysisAnswers) {
        const answers = JSON.parse(analysisAnswers);
        analyzeBusinessIdeaWithAnswers(prompt, answers);
      } else {
        analyzeBusinessIdea(prompt);
      }
    } else {
      router.push('/');
    }

    // Check authentication can be optional for demo
  }, [router]);

  const analyzeBusinessIdea = async (prompt: string) => {
    setIsAnalyzing(true);
    try {
      // Analyze the business idea using AI
      const analysisResult = await AIAnalysisService.analyzeBusinessIdea(prompt);
      setAnalysis(analysisResult);

      // Pre-fill store name suggestion
      const suggestedName = analysisResult.classification.keywords[0]
        ? analysisResult.classification.keywords[0].charAt(0).toUpperCase() + analysisResult.classification.keywords[0].slice(1) + ' Store'
        : 'My Store';
      setStoreName(suggestedName);

      // Pre-select essential features
      setSelectedFeatures(analysisResult.features.essential);

      // Set recommended color scheme
      setColorScheme(analysisResult.design.colorScheme);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeBusinessIdeaWithAnswers = async (prompt: string, answers: Record<string, string[]>) => {
    setIsAnalyzing(true);
    try {
      // Use the questionnaire answers to enhance analysis
      const enhancedAnalysis = await AIAnalysisService.analyzeBusinessIdea(prompt);

      // Override with user selections from questionnaire
      if (answers.business_type?.length > 0) {
        enhancedAnalysis.classification.businessType = answers.business_type[0] as any;
      }
      if (answers.product_category?.length > 0) {
        enhancedAnalysis.classification.productCategory = answers.product_category[0];
      }
      if (answers.target_audience?.length > 0) {
        // Map audience selection to analysis
        const audienceMap: Record<string, any> = {
          'gen_z': { primary: 'Gen Z digital natives', age: '18-25', interests: ['social media', 'trends', 'sustainability'] },
          'millennials': { primary: 'Millennial professionals', age: '26-40', interests: ['tech', 'experiences', 'values'] },
          'gen_x': { primary: 'Gen X established consumers', age: '41-55', interests: ['quality', 'reliability', 'service'] },
          'boomers': { primary: 'Baby Boomers', age: '56+', interests: ['trust', 'tradition', 'customer service'] },
          'families': { primary: 'Families with children', age: '25-45', interests: ['value', 'quality', 'convenience'] },
          'professionals': { primary: 'Working professionals', age: '25-50', interests: ['efficiency', 'quality', 'innovation'] }
        };
        enhancedAnalysis.targetAudience = audienceMap[answers.target_audience[0]] || enhancedAnalysis.targetAudience;
      }
      if (answers.design_style?.length > 0) {
        const styleMap: Record<string, string> = {
          'modern': 'minimal',
          'bold': 'warm',
          'elegant': 'luxury',
          'playful': 'warm',
          'rustic': 'nature',
          'tech': 'professional'
        };
        enhancedAnalysis.design.colorScheme = styleMap[answers.design_style[0]] || 'professional';
        enhancedAnalysis.design.style = answers.design_style[0];
      }
      if (answers.features?.length > 0) {
        // Add selected features to recommended
        answers.features.forEach(feature => {
          if (!enhancedAnalysis.features.essential.includes(feature)) {
            enhancedAnalysis.features.recommended.push(feature);
          }
        });
      }

      setAnalysis(enhancedAnalysis);

      // Pre-fill based on enhanced analysis
      const suggestedName = enhancedAnalysis.classification.keywords[0]
        ? enhancedAnalysis.classification.keywords[0].charAt(0).toUpperCase() + enhancedAnalysis.classification.keywords[0].slice(1) + ' Store'
        : 'My Store';
      setStoreName(suggestedName);
      setSelectedFeatures([...enhancedAnalysis.features.essential, ...answers.features || []]);
      setColorScheme(enhancedAnalysis.design.colorScheme);

      // Skip to step 2 since we already have analysis
      setCurrentStep(2);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!storeName.trim() || !analysis) return;

    setIsGenerating(true);
    setCurrentStep(3);

    try {
      // Make API call with all the analyzed data and preferences
      const response = await fetch('/api/generate-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt,
          storeName,
          analysis,
          preferences: {
            features: selectedFeatures,
            colorScheme,
            additionalNotes
          },
          userId: user?.id
        })
      });

      if (!response.ok) throw new Error('Generation failed');

      const result = await response.json();
      handleGenerationComplete(result);
    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
    }
  };

  const handleGenerationComplete = (result: any) => {
    setGenerationResult(result);
    setIsGenerating(false);

    // Generate unique URL
    if (result && result.siteId) {
      const subdomain = storeName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const url = `https://${subdomain}-${result.siteId}.buildstore.app`;
      setSiteUrl(url);

      // Store the generated site
      localStorage.setItem(`site_${result.siteId}`, JSON.stringify(result));
    }
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Authentication is optional for demo purposes
  // if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-lg font-semibold text-white">AI Store Generator</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-gray-600 text-gray-400 bg-slate-800'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 mr-8">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-purple-400' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mr-8 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Idea */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Your Business Idea</h2>
          <p className="text-slate-300 italic">"{userPrompt}"</p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
            {isAnalyzing ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-pulse" />
                <h2 className="text-2xl font-bold text-white mb-4">AI is Analyzing Your Idea...</h2>
                <p className="text-slate-400 mb-8">Understanding your business requirements and generating recommendations</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            ) : analysis && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">AI Analysis Complete</h2>

                {/* Business Classification */}
                <div className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Business Classification</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 text-sm">Type:</span>
                      <p className="text-white font-medium capitalize">{analysis.classification.businessType}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">Category:</span>
                      <p className="text-white font-medium capitalize">{analysis.classification.productCategory}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-sm">Key Concepts:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysis.classification.keywords.slice(0, 8).map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Types */}
                <div className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Product Types Detected</h3>
                  <div className="space-y-4">
                    {analysis.productTypes.physical.detected && (
                      <div className="flex items-start space-x-3">
                        <Package className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <p className="text-white font-medium">Physical Products</p>
                          <p className="text-slate-400 text-sm">{analysis.productTypes.physical.reasoning}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {analysis.productTypes.physical.examples.map((ex, i) => (
                              <span key={i} className="text-xs text-slate-500">{ex}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {analysis.productTypes.digital.detected && (
                      <div className="flex items-start space-x-3">
                        <Globe className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <p className="text-white font-medium">Digital Products</p>
                          <p className="text-slate-400 text-sm">{analysis.productTypes.digital.reasoning}</p>
                        </div>
                      </div>
                    )}
                    {analysis.productTypes.services.detected && (
                      <div className="flex items-start space-x-3">
                        <Users className="w-5 h-5 text-yellow-400 mt-1" />
                        <div>
                          <p className="text-white font-medium">Services</p>
                          <p className="text-slate-400 text-sm">{analysis.productTypes.services.reasoning}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Target Audience</h3>
                  <p className="text-white mb-2">{analysis.targetAudience.primary}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-400">Age: <span className="text-slate-300">{analysis.targetAudience.age}</span></span>
                    <span className="text-slate-400">Interests: <span className="text-slate-300">{analysis.targetAudience.interests.join(', ')}</span></span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Continue to Customization
                </button>
              </>
            )}
          </div>
        )}

        {currentStep === 2 && analysis && (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Customize Your Store</h2>

            {/* Store Name */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                placeholder="Enter your store name"
              />
            </div>

            {/* Features Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Select Features for Your Store
              </label>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-green-400 mb-2">Essential Features (Recommended)</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {analysis.features.essential.map((feature, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-slate-300">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-yellow-400 mb-2">Recommended Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {analysis.features.recommended.map((feature, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-slate-300">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-blue-400 mb-2">Advanced Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {analysis.features.advanced.map((feature, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-slate-300">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Design Style */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Design Style
              </label>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-white mb-2">Recommended: <span className="font-semibold capitalize">{analysis.design.style}</span></p>
                <p className="text-slate-400 text-sm mb-3">Color Scheme: {colorScheme}</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.design.inspiration.map((site, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Additional Requirements (Optional)
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                placeholder="Any specific requirements or features you'd like to add..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/50 transition-colors"
              >
                Back to Analysis
              </button>
              <button
                onClick={handleGenerate}
                disabled={!storeName.trim()}
                className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                  storeName.trim()
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Wand2 className="w-5 h-5" />
                <span>Generate My Store</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            {isGenerating && (
              <GenerationProgress
                isGenerating={true}
                userPrompt={{
                  brandName: storeName,
                  description: userPrompt,
                  category: analysis?.classification.productCategory || 'general',
                  colorScheme: colorScheme
                }}
                userId={user?.id || 'demo-user'}
                onComplete={handleGenerationComplete}
              />
            )}

            {!isGenerating && generationResult && (
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Store is Live! 🎉</h2>
                <p className="text-slate-300 mb-8">
                  We've successfully created your {analysis?.classification.productCategory} e-commerce store
                </p>

                <div className="bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-600">
                  <div className="flex items-center justify-center space-x-2 text-purple-400 font-medium mb-3">
                    <Globe className="w-5 h-5" />
                    <span>Your Store URL</span>
                  </div>
                  <p className="text-xl font-mono text-white bg-slate-800 px-6 py-3 rounded-lg">
                    {siteUrl}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Link
                    href={`/sites/${generationResult.siteId}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                  >
                    View Your Store
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 border border-slate-600 text-slate-300 py-4 px-6 rounded-xl font-semibold hover:bg-slate-700/50 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
