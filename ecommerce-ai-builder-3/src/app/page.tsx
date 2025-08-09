'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Store, Zap, Globe, Code, Users, TrendingUp, Shield, ChevronDown } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    localStorage.setItem('userPrompt', prompt);

    // Navigate to analysis page
    setTimeout(() => {
      router.push('/analyze');
    }, 500);
  };

  const examplePrompts = [
    { text: 'Create an online grocery store with fresh produce and same-day delivery', category: 'Grocery' },
    { text: 'Build a modern fashion boutique for sustainable clothing', category: 'Fashion' },
    { text: 'Design a tech store selling premium electronics and gadgets', category: 'Electronics' },
    { text: 'Make a beauty store for organic cosmetics and skincare', category: 'Beauty' }
  ];

  const stats = [
    { number: '10,000+', label: 'Stores Created', icon: Store },
    { number: '98%', label: 'Customer Satisfaction', icon: Users },
    { number: '< 2 min', label: 'Generation Time', icon: Zap },
    { number: '$1M+', label: 'Revenue Generated', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background with larger gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent animate-pulse-slow" style={{animationDelay: '2s'}} />

        {/* Moving gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Main Content - Use more vertical space */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="px-8 py-6 animate-fade-in-down">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Store className="w-10 h-10 text-white" />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 animate-pulse" />
              </div>
              <span className="text-3xl font-bold text-white">BuildStore</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section - Larger and more prominent */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
          {/* Animated Badge */}
          <div className="mb-8 animate-bounce-slow">
            <div className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur border border-purple-500/30 rounded-full">
              <span className="text-sm text-purple-300 font-medium">✨ AI-Powered • No Code Required • Deploy Instantly</span>
            </div>
          </div>

          {/* Main Headline - Bigger and bolder */}
          <div className="text-center mb-16 animate-fade-in max-w-6xl">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
              Build Your Dream
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                E-Commerce Store
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Describe your business idea and watch AI create a complete,
              professional online store in under 2 minutes
            </p>
          </div>

          {/* Main Prompt Form - Larger and more prominent */}
          <form onSubmit={handleSubmit} className="w-full max-w-4xl animate-fade-in-up mb-12">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg transition-all duration-500 ${isHovered ? 'opacity-75 blur-xl' : 'opacity-30'}`} />

              <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700 p-3 transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 text-purple-400 ml-6 mr-3 animate-pulse" />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your dream store in detail..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-2 py-6 focus:outline-none text-xl"
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className={`px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 mr-2 ${
                      prompt.trim() && !isLoading
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Build Now</span>
                        <ArrowRight className="w-6 h-6 animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Example Prompts - More visual */}
          <div className="animate-fade-in-up animation-delay-200 mb-16">
            <p className="text-gray-400 text-lg mb-6 text-center">Popular store ideas:</p>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example.text)}
                  className="group px-6 py-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{index === 0 ? '🛒' : index === 1 ? '👗' : index === 2 ? '📱' : '💄'}</span>
                    <div className="text-left">
                      <p className="text-white font-semibold">{example.category}</p>
                      <p className="text-gray-400 text-sm max-w-xs">{example.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full animate-fade-in-up animation-delay-400">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
                style={{animationDelay: `${index * 100 + 400}ms`}}
              >
                <div className="relative inline-block mb-4">
                  <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <div className="absolute -inset-3 bg-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-3xl font-bold text-white mb-1 animate-count-up">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-30px) translateX(20px) scale(1.05); }
          66% { transform: translateY(20px) translateX(-20px) scale(0.95); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(30px) translateX(-20px) scale(1.05); }
          66% { transform: translateY(-20px) translateX(20px) scale(0.95); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }

        @keyframes count-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 20s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-count-up {
          animation: count-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
