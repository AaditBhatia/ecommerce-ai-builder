'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles, Target, Package, Users, Palette, DollarSign, Globe, Zap, Check, Brain } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'business_type',
    title: 'What type of business are you building?',
    description: 'This helps us understand your business model and requirements',
    icon: Target,
    options: [
      { value: 'retail', label: 'Retail Store', description: 'Selling directly to consumers', icon: '🛍️' },
      { value: 'wholesale', label: 'Wholesale/B2B', description: 'Selling to other businesses', icon: '🏢' },
      { value: 'marketplace', label: 'Marketplace', description: 'Multiple vendors on one platform', icon: '🏪' },
      { value: 'subscription', label: 'Subscription Box', description: 'Recurring deliveries', icon: '📦' }
    ]
  },
  {
    id: 'product_category',
    title: 'What will you be selling?',
    description: 'Choose the primary category for your products',
    icon: Package,
    options: [
      { value: 'fashion', label: 'Fashion & Apparel', icon: '👗' },
      { value: 'food', label: 'Food & Grocery', icon: '🍎' },
      { value: 'electronics', label: 'Electronics & Tech', icon: '📱' },
      { value: 'beauty', label: 'Beauty & Cosmetics', icon: '💄' },
      { value: 'home', label: 'Home & Garden', icon: '🏡' },
      { value: 'sports', label: 'Sports & Fitness', icon: '⚽' },
      { value: 'toys', label: 'Toys & Games', icon: '🎮' },
      { value: 'other', label: 'Other', icon: '📦' }
    ]
  },
  {
    id: 'target_audience',
    title: 'Who is your target audience?',
    description: 'Understanding your customers helps create the perfect design',
    icon: Users,
    options: [
      { value: 'gen_z', label: 'Gen Z (18-25)', description: 'Digital natives, trend-focused', icon: '📱' },
      { value: 'millennials', label: 'Millennials (26-40)', description: 'Tech-savvy, value-conscious', icon: '💻' },
      { value: 'gen_x', label: 'Gen X (41-55)', description: 'Quality-focused, established', icon: '🏆' },
      { value: 'boomers', label: 'Boomers (56+)', description: 'Traditional, trust-focused', icon: '📺' },
      { value: 'families', label: 'Families', description: 'Parents and children', icon: '👨‍👩‍👧‍👦' },
      { value: 'professionals', label: 'Professionals', description: 'Business and career-focused', icon: '💼' }
    ]
  },
  {
    id: 'design_style',
    title: 'What design style do you prefer?',
    description: 'This will define the look and feel of your store',
    icon: Palette,
    options: [
      { value: 'modern', label: 'Modern & Minimal', description: 'Clean, lots of white space', icon: '⬜' },
      { value: 'bold', label: 'Bold & Colorful', description: 'Vibrant, eye-catching', icon: '🎨' },
      { value: 'elegant', label: 'Elegant & Luxury', description: 'Premium, sophisticated', icon: '✨' },
      { value: 'playful', label: 'Fun & Playful', description: 'Friendly, approachable', icon: '🎈' },
      { value: 'rustic', label: 'Natural & Rustic', description: 'Organic, earthy tones', icon: '🌿' },
      { value: 'tech', label: 'Tech & Futuristic', description: 'Modern, innovative', icon: '🚀' }
    ]
  },
  {
    id: 'budget_range',
    title: 'What is your average product price range?',
    description: 'This helps us optimize for your pricing strategy',
    icon: DollarSign,
    options: [
      { value: 'budget', label: 'Budget ($0-25)', description: 'Value-focused pricing', icon: '💵' },
      { value: 'mid', label: 'Mid-range ($25-100)', description: 'Balanced quality and price', icon: '💰' },
      { value: 'premium', label: 'Premium ($100-500)', description: 'High-quality products', icon: '💎' },
      { value: 'luxury', label: 'Luxury ($500+)', description: 'Exclusive, high-end items', icon: '👑' }
    ]
  },
  {
    id: 'features',
    title: 'Which features are most important to you?',
    description: 'Select the key features for your store',
    icon: Zap,
    options: [
      { value: 'inventory', label: 'Inventory Management', description: 'Track stock levels', icon: '📊' },
      { value: 'shipping', label: 'Advanced Shipping', description: 'Multiple shipping options', icon: '🚚' },
      { value: 'subscriptions', label: 'Subscriptions', description: 'Recurring payments', icon: '🔄' },
      { value: 'loyalty', label: 'Loyalty Program', description: 'Reward repeat customers', icon: '🎁' },
      { value: 'multilingual', label: 'Multi-language', description: 'Support multiple languages', icon: '🌍' },
      { value: 'analytics', label: 'Advanced Analytics', description: 'Detailed insights', icon: '📈' }
    ]
  }
];

export default function AnalyzePage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const prompt = localStorage.getItem('userPrompt');
    if (prompt) {
      setUserPrompt(prompt);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.includes(value)
        ? prev[questionId].filter(v => v !== value)
        : [...(prev[questionId] || []), value]
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeAndGenerate();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeAndGenerate = async () => {
    setIsAnalyzing(true);
    setShowResults(true);

    // Store answers for generation
    localStorage.setItem('analysisAnswers', JSON.stringify(answers));

    // Simulate analysis time
    setTimeout(() => {
      router.push('/generate');
    }, 3000);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canProceed = answers[question?.id]?.length > 0;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <Brain className="w-24 h-24 text-purple-400 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-purple-600/20 blur-3xl" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Analyzing Your Requirements</h2>
          <p className="text-xl text-gray-300 mb-8">Creating the perfect e-commerce solution for you...</p>

          <div className="flex justify-center space-x-3">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Store Analysis</span>
            </div>
            <div className="text-sm text-slate-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* User's Prompt Display */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6 mb-12 animate-fade-in-down">
          <p className="text-sm text-purple-400 mb-2">Your Business Idea:</p>
          <p className="text-lg text-white italic">"{userPrompt}"</p>
        </div>

        {/* Question Section */}
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600/20 rounded-full mb-6">
              <question.icon className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{question.title}</h2>
            <p className="text-xl text-gray-300">{question.description}</p>
          </div>

          {/* Options Grid */}
          <div className={`grid ${question.options.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mb-12`}>
            {question.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  answers[question.id]?.includes(option.value)
                    ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/25'
                    : 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50'
                }`}
                style={{animationDelay: `${index * 50}ms`}}
              >
                {answers[question.id]?.includes(option.value) && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                )}

                <div className="text-3xl mb-3">{option.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{option.label}</h3>
                {option.description && (
                  <p className="text-sm text-gray-400">{option.description}</p>
                )}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentQuestion === 0
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentQuestion
                      ? 'w-8 bg-purple-500'
                      : index < currentQuestion
                      ? 'bg-purple-400'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>{currentQuestion === questions.length - 1 ? 'Generate Store' : 'Next'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
