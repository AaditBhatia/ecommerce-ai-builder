'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Edit, Share, Download } from 'lucide-react';
import Link from 'next/link';
import { GeneratedSite } from '@/lib/generation';
import EcommerceSitePreview from '@/components/EcommerceSitePreview';

export default function SitePage() {
  const params = useParams();
  const [site, setSite] = useState<GeneratedSite | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const siteId = params.id as string;

    // Load the generated site from localStorage
    const savedSite = localStorage.getItem(`site_${siteId}`);
    if (savedSite) {
      setSite(JSON.parse(savedSite));
    }
    setLoading(false);
  }, [params.id]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Site URL copied to clipboard!');
  };

  const handleDownload = () => {
    // This would trigger the ZIP download functionality
    alert('Download functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your store...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Store Not Found</h1>
          <p className="text-gray-600 mb-6">The store you're looking for doesn't exist.</p>
          <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const siteUrl = `https://${site.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${site.id.slice(-6)}.buildstore.app`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{site.brandName}</h1>
              <p className="text-sm text-gray-500 capitalize">{site.category} Store</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Live Site
            </a>
          </div>
        </div>
      </header>

      {/* Site URL Banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Live Site:</span>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {siteUrl}
              </a>
            </div>
            <div className="text-sm text-gray-500">
              Generated {new Date(site.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6">
            {[
              { id: 'home', name: 'Homepage' },
              { id: 'shop', name: 'Product Listing' },
              { id: 'product', name: 'Product Detail' },
              { id: 'cart', name: 'Cart & Checkout' }
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === page.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Site Preview */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 border-b flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-600">
                  {site.brandName.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>

            {/* Site Content */}
            <div className="min-h-screen">
              <EcommerceSitePreview
                site={site}
                currentPage={currentPage}
                device="desktop"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Link
          href="/generate"
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors hover:shadow-xl"
        >
          <Edit className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
