'use client';

import { useState } from 'react';
import { Plus, Paperclip, Globe, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function LovablePrompt() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !user) return;

    setIsLoading(true);

    // Store the prompt and redirect to generation page
    localStorage.setItem('initialPrompt', prompt);
    router.push('/generate');
  };

  const handleTemplateClick = (template: string) => {
    const promptText = template.replace(/^[🛒👕📱🏠]\s/, ''); // Remove emoji
    setPrompt(`Create a ${promptText}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Prompt Input - Lovable Style */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask BuildStore to create a prototype..."
              rows={4}
              className="w-full bg-transparent text-white placeholder-slate-400 resize-none focus:outline-none text-lg"
              maxLength={500}
            />

            {/* Bottom Bar */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm">Attach</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">Public</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-slate-400 text-sm">
                  GPT-5
                </div>
                {user ? (
                  <button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                      prompt.trim() && !isLoading
                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                        : 'bg-slate-700 text-slate-500'
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                ) : (
                  <AuthModal defaultMode="signup">
                    <button
                      type="button"
                      disabled={!prompt.trim()}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                        prompt.trim()
                          ? 'bg-white text-slate-900 hover:bg-slate-100'
                          : 'bg-slate-700 text-slate-500'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </AuthModal>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Quick Start Examples */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm mb-4">
          Need inspiration? Try these examples:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'Create an online grocery store with fresh produce and delivery',
            'Build a modern fashion boutique for sustainable clothing',
            'Design a tech store selling premium electronics and gadgets',
            'Make a home decor shop with furniture and accessories'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="px-3 py-1.5 bg-slate-800/30 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-700/50 hover:text-white transition-all duration-200"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
