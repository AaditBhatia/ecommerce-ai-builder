'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const examplePrompts = [
  "Create an online grocery store with fresh produce and delivery options",
  "Build a modern fashion boutique for sustainable clothing",
  "Design a tech store selling premium electronics and gadgets",
  "Make a home decor shop with furniture and accessories",
  "Create a beauty store for cosmetics and skincare products"
];

export default function LandingPrompt() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Store the prompt and redirect to generation page
    localStorage.setItem('initialPrompt', prompt);
    router.push('/generate');
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div id="prompt" className="max-w-4xl mx-auto">
      {/* Main Prompt Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 slide-in-up" style={{animationDelay: '0.6s'}}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your dream store... e.g., 'Create an online grocery store with fresh produce, organic options, and same-day delivery'"
              rows={4}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 resize-none transition-colors placeholder-gray-400"
              maxLength={500}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {prompt.length}/500
            </div>
          </div>

          {user ? (
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className={`w-full flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                !prompt.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate My Store
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          ) : (
            <AuthModal defaultMode="signup">
              <button
                type="button"
                disabled={!prompt.trim()}
                className={`w-full flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  !prompt.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                Get Started - It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </AuthModal>
          )}
        </form>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            No credit card required
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Ready in 30 seconds
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Fully customizable
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-6 font-medium">Need inspiration? Try these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
