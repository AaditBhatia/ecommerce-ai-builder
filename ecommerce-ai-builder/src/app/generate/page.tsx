'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Palette, Globe, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { generateEcommerceSite, type GeneratedSite } from '@/lib/generation';
import { db } from '@/lib/supabase';

const categories = [
  { id: 'grocery', name: 'Grocery Store', emoji: '🛒', description: 'Fresh produce, delivery, inventory' },
  { id: 'fashion', name: 'Fashion', emoji: '👗', description: 'Clothing, accessories, size guides' },
  { id: 'electronics', name: 'Electronics', emoji: '📱', description: 'Gadgets, specs, reviews' },
  { id: 'home', name: 'Home & Garden', emoji: '🏠', description: 'Furniture, decor, tools' },
  { id: 'beauty', name: 'Beauty', emoji: '💄', description: 'Cosmetics, skincare, tutorials' },
  { id: 'sports', name: 'Sports', emoji: '⚽', description: 'Equipment, apparel, fitness' },
];

const colorSchemes = [
  { id: 'minimal', name: 'Minimal', colors: ['#FFFFFF', '#F8F9FA', '#000000'], description: 'Clean & Simple' },
  { id: 'professional', name: 'Professional', colors: ['#1E3A8A', '#FFFFFF', '#E5E7EB'], description: 'Business Ready' },
  { id: 'warm', name: 'Warm', colors: ['#F59E0B', '#FEF3C7', '#92400E'], description: 'Friendly & Inviting' },
  { id: 'nature', name: 'Nature', colors: ['#10B981', '#D1FAE5', '#065F46'], description: 'Organic & Fresh' },
  { id: 'luxury', name: 'Luxury', colors: ['#000000', '#D4AF37', '#FFFFFF'], description: 'Premium & Elegant' },
];

const steps = [
  { id: 1, name: 'Category', icon: Palette },
  { id: 2, name: 'Style', icon: Sparkles },
  { id: 3, name: 'Generate', icon: Globe },
];

export default function GeneratePage() {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [colorScheme, setColorScheme] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [siteUrl, setSiteUrl] = useState('');

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Get the initial prompt from localStorage
    const prompt = localStorage.getItem('initialPrompt');
    if (prompt) {
      setInitialPrompt(prompt);
      // Try to auto-detect category from prompt
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes('grocery') || lowerPrompt.includes('food')) setCategory('grocery');
      else if (lowerPrompt.includes('fashion') || lowerPrompt.includes('clothing')) setCategory('fashion');
      else if (lowerPrompt.includes('tech') || lowerPrompt.includes('electronics')) setCategory('electronics');
      else if (lowerPrompt.includes('home') || lowerPrompt.includes('furniture')) setCategory('home');
      else if (lowerPrompt.includes('beauty') || lowerPrompt.includes('cosmetics')) setCategory('beauty');
      else if (lowerPrompt.includes('sports') || lowerPrompt.includes('fitness')) setCategory('sports');
    } else {
      // Redirect back if no prompt
      router.push('/');
    }

    // Check authentication
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGenerate = async () => {
    if (!category || !storeName.trim()) return;

    setIsGenerating(true);
    setCurrentStep(3);

    try {
      // Generate the site
      const site = await generateEcommerceSite({
        brandName: storeName,
        description: initialPrompt,
        category: category,
        colorScheme: colorScheme
      });

      setGeneratedSite(site);

      // Generate a unique URL for the site
      const siteId = site.id;
      const subdomain = storeName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const url = `https://${subdomain}-${siteId.slice(-6)}.buildstore.app`;
      setSiteUrl(url);

      // Store the generated site
      localStorage.setItem(`site_${siteId}`, JSON.stringify(site));

      // Save to user's projects (in real app, this would go to Supabase)
      const userProjects = JSON.parse(localStorage.getItem(`projects_${user?.id}`) || '[]');
      userProjects.push({
        id: siteId,
        name: storeName,
        category: category,
        status: 'completed',
        createdAt: new Date().toISOString(),
        deployUrl: url
      });
      localStorage.setItem(`projects_${user?.id}`, JSON.stringify(userProjects));

    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Website Generator</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 mr-8">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mr-8 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Prompt */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Store Idea</h2>
          <p className="text-gray-600 italic">"{initialPrompt}"</p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Store Category</h2>
            <p className="text-gray-600 mb-8">Select the category that best matches your business</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-6 text-left rounded-xl border-2 transition-all hover:shadow-md ${
                    category === cat.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-4">{cat.emoji}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
                      <p className="text-sm text-gray-500">{cat.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g., Fresh Market, Urban Style, Tech Haven"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              disabled={!category || !storeName.trim()}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                category && storeName.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Style
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
            <p className="text-gray-600 mb-8">Select a color scheme that matches your brand</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setColorScheme(scheme.id)}
                  className={`p-6 text-left rounded-xl border-2 transition-all hover:shadow-md ${
                    colorScheme === scheme.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-2 mr-4">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                      <p className="text-sm text-gray-500">{scheme.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 px-6 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Generate My Store
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            {isGenerating ? (
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Store...</h2>
                <p className="text-gray-600 mb-8">Our AI is generating your complete e-commerce website</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            ) : generatedSite ? (
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Store is Ready! 🎉</h2>
                <p className="text-gray-600 mb-8">
                  We've created a complete e-commerce website for "{storeName}"
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium mb-2">
                    <Globe className="w-5 h-5" />
                    <span>Your Store URL</span>
                  </div>
                  <p className="text-lg font-mono bg-white px-4 py-2 rounded border">
                    {siteUrl}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Link
                    href={`/sites/${generatedSite.id}`}
                    className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    View Your Store
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
