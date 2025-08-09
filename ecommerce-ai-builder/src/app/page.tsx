import { Store } from "lucide-react";
import LovablePrompt from "@/components/LovablePrompt";
import LovableHeader from "@/components/LovableHeader";
import CommunitySection from "@/components/CommunitySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <LovableHeader />

      {/* Hero Section - Lovable Style */}
      <main className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-purple-900/10 to-transparent"></div>

        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-32">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Build something{" "}
              <span className="inline-flex items-center gap-2">
                <Store className="w-16 h-16 text-pink-500" />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  BuildStore
                </span>
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Create e-commerce stores by chatting with AI
            </p>
          </div>

          {/* Main Prompt Input - Lovable Style */}
          <LovablePrompt />

          {/* Quick Templates */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              '🛒 Grocery marketplace',
              '👕 Fashion boutique',
              '📱 Electronics store',
              '🏠 Home & garden'
            ].map((template, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Community Section */}
      <CommunitySection />
    </div>
  );
}
