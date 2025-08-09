'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Edit, Share, Eye, Smartphone, Tablet, Monitor } from 'lucide-react';
import { GeneratedSite, getColorSchemeStyles } from '@/lib/generation';
import EcommerceSitePreview from '@/components/EcommerceSitePreview';

export default function PreviewPage() {
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load generated site from localStorage
    const savedSite = localStorage.getItem('generatedSite');
    if (savedSite) {
      setGeneratedSite(JSON.parse(savedSite));
    }
    setLoading(false);
  }, []);

  const handleDownload = () => {
    // This would trigger the ZIP download of the generated Next.js project
    alert('Download functionality would be implemented here');
  };

  const handleEdit = () => {
    // Navigate back to builder with current data
    window.location.href = '/?edit=true';
  };

  const handleShare = () => {
    // Copy preview link to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Preview link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your store...</p>
        </div>
      </div>
    );
  }

  if (!generatedSite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Store Found</h1>
          <p className="text-gray-600 mb-6">Please generate a store first.</p>
          <Link href="/" className="btn-primary">
            Generate Store
          </Link>
        </div>
      </div>
    );
  }

  const colorStyles = getColorSchemeStyles(generatedSite.colorScheme);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Builder
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-lg font-semibold text-gray-900">
              {generatedSite.brandName} Preview
            </h1>
          </div>

          {/* Device Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 ${previewDevice === 'desktop' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 ${previewDevice === 'tablet' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 ${previewDevice === 'mobile' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
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
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  currentPage === page.id
                    ? 'bg-navy-100 text-navy-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${
            previewDevice === 'mobile' ? 'max-w-sm mx-auto' :
            previewDevice === 'tablet' ? 'max-w-2xl mx-auto' :
            'w-full'
          }`}>
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-xs text-gray-600">
                  {generatedSite.brandName.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              <Eye className="h-4 w-4 text-gray-400" />
            </div>

            {/* Site Preview */}
            <EcommerceSitePreview
              site={generatedSite}
              currentPage={currentPage}
              device={previewDevice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
