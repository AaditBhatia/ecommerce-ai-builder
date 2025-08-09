'use client';

import { useState } from 'react';
import { Send, Wand2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { generateEcommerceSite, type GeneratedSite } from '@/lib/generation';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const categories = [
  { id: 'fashion', name: 'Fashion & Apparel', emoji: '👕' },
  { id: 'electronics', name: 'Electronics & Tech', emoji: '📱' },
  { id: 'home', name: 'Home & Garden', emoji: '🏠' },
  { id: 'beauty', name: 'Beauty & Cosmetics', emoji: '💄' },
  { id: 'sports', name: 'Sports & Fitness', emoji: '⚽' },
  { id: 'food', name: 'Food & Beverage', emoji: '🍕' },
  { id: 'jewelry', name: 'Jewelry & Watches', emoji: '💎' },
  { id: 'books', name: 'Books & Media', emoji: '📚' },
];

const colorSchemes = [
  { id: 'minimal', name: 'Minimal', colors: ['#FFFFFF', '#F8F9FA', '#000000'] },
  { id: 'professional', name: 'Professional', colors: ['#1E3A8A', '#FFFFFF', '#E5E7EB'] },
  { id: 'warm', name: 'Warm', colors: ['#F59E0B', '#FEF3C7', '#92400E'] },
  { id: 'nature', name: 'Nature', colors: ['#10B981', '#D1FAE5', '#065F46'] },
  { id: 'luxury', name: 'Luxury', colors: ['#000000', '#D4AF37', '#FFFFFF'] },
];

export default function PromptBuilder() {
  const [prompt, setPrompt] = useState('');
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [colorScheme, setColorScheme] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);

  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setIsGenerating(true);

      const generationRequest = {
        brandName: brandName || 'My Store',
        description: prompt,
        category: category || 'fashion',
        colorScheme: colorScheme
      };

      const site = await generateEcommerceSite(generationRequest);
      setGeneratedSite(site);

      // Store in localStorage for preview page
      localStorage.setItem('generatedSite', JSON.stringify(site));

      // Navigate to preview page
      window.location.href = '/preview';

    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Prompt Interface */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Side - Prompt Input */}
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Describe Your Dream Store
              </h2>
              <p className="text-gray-600">
                Tell us about your business, products, and style preferences. Be as detailed as you'd like.
              </p>
            </div>

            {/* Brand Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name (Optional)
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g., Urban Threads, TechHub, Garden Oasis"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors"
              />
            </div>

            {/* Main Prompt Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Store
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="I want to create a modern clothing store that sells sustainable fashion for young professionals. The design should be clean and minimal with a focus on showcasing the quality of our organic cotton pieces..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors resize-none"
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {prompt.length}/1000 characters
              </div>
            </div>

            {/* Quick Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      category === cat.id
                        ? 'border-navy-500 bg-navy-50 text-navy-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg mr-2">{cat.emoji}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Scheme Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color Preference
              </label>
              <div className="flex flex-wrap gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => setColorScheme(scheme.id)}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      colorScheme === scheme.id
                        ? 'border-navy-500 bg-navy-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex space-x-1 mr-3">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{scheme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            {user ? (
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className={`w-full flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  !prompt.trim() || isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating Your Store...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Generate My Store
                  </>
                )}
              </button>
            ) : (
              <AuthModal defaultMode="signup">
                <button
                  className={`w-full flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    !prompt.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                  }`}
                  disabled={!prompt.trim()}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Sign Up to Generate
                </button>
              </AuthModal>
            )}
          </div>

          {/* Right Side - Preview */}
          <div className="bg-gray-50 p-8 lg:p-12">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 ${previewDevice === 'desktop' ? 'bg-navy-600 text-white' : 'text-gray-600'}`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-2 ${previewDevice === 'tablet' ? 'bg-navy-600 text-white' : 'text-gray-600'}`}
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 ${previewDevice === 'mobile' ? 'bg-navy-600 text-white' : 'text-gray-600'}`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              <div className="h-8 bg-gray-100 flex items-center px-3 border-b">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xs text-gray-500">
                    {brandName || 'Your Store'}.buildstore.com
                  </div>
                </div>
              </div>

              <div className={`${
                previewDevice === 'mobile' ? 'h-96' : previewDevice === 'tablet' ? 'h-80' : 'h-72'
              } bg-white flex items-center justify-center`}>
                {prompt ? (
                  <div className="text-center px-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Monitor className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Mobile-responsive design
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Integrated payment processing
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                SEO optimized pages
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Admin dashboard included
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Need inspiration? Try these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'A minimalist jewelry store with elegant product photography',
            'A vibrant streetwear brand targeting Gen Z customers',
            'An organic food marketplace with local supplier focus'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
