'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const communityProjects = [
  {
    title: "Fresh Market Store",
    description: "Complete grocery e-commerce with delivery tracking",
    category: "Grocery",
    emoji: "🛒",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    title: "Urban Fashion Hub",
    description: "Modern clothing store with size guides and reviews",
    category: "Fashion",
    emoji: "👕",
    gradient: "from-pink-500 to-purple-600"
  },
  {
    title: "TechGear Store",
    description: "Electronics shop with detailed product specifications",
    category: "Electronics",
    emoji: "📱",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Home & Garden Co",
    description: "Beautiful home decor and garden essentials marketplace",
    category: "Home & Garden",
    emoji: "🏠",
    gradient: "from-amber-500 to-orange-600"
  }
];

export default function CommunitySection() {
  return (
    <section className="bg-slate-800/50 backdrop-blur border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            From the Community
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl">
            See what entrepreneurs are building with BuildStore AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl`}>
                  {project.emoji}
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-semibold text-lg group-hover:text-pink-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {project.category}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">
                  AI Generated
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/community"
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            <span>View all community stores</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a href="/support" className="text-slate-400 hover:text-white transition-colors text-sm">
                Support
              </a>
              <a href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">
                Documentation
              </a>
            </div>

            <div className="text-slate-500 text-sm">
              © 2024 BuildStore. Built with AI.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
