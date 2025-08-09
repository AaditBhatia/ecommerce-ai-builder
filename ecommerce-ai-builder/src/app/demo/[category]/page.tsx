'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Eye, Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import EcommerceSitePreview from '@/components/EcommerceSitePreview';
import { GeneratedSite } from '@/lib/generation';

interface DemoPageProps {
  params: {
    category: string;
  };
}

const demoSites: { [key: string]: GeneratedSite } = {
  fashion: {
    id: 'demo_fashion',
    brandName: 'Nike Store',
    description: 'Premium athletic wear with cutting-edge design and technology for athletes and lifestyle enthusiasts.',
    category: 'fashion',
    colorScheme: 'minimal',
    hero: {
      title: 'Nike Store - Just Do It',
      subtitle: 'Discover our latest collection of premium athletic wear designed for peak performance.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'
    },
    products: [
      { id: '1', name: 'Air Max 270', price: 150, description: 'Revolutionary cushioning meets street-ready style', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['7', '8', '9', '10', '11'], color: ['Black', 'White', 'Red'] } },
      { id: '2', name: 'Dri-FIT Training Shirt', price: 35, description: 'Moisture-wicking technology for peak performance', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Gray'] } },
      { id: '3', name: 'Tech Fleece Hoodie', price: 90, description: 'Lightweight warmth with modern design', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Gray', 'Navy'] } },
      { id: '4', name: 'Pro Training Shorts', price: 45, description: 'Flexible fit for intense workouts', image: 'https://images.unsplash.com/photo-1506629905607-c8d14c82ae07?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Navy', 'Gray'] } },
      { id: '5', name: 'React Running Shoes', price: 120, description: 'Responsive cushioning for every mile', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['7', '8', '9', '10', '11'], color: ['White', 'Black', 'Blue'] } },
      { id: '6', name: 'Training Tank Top', price: 28, description: 'Breathable fabric for high-intensity training', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] } },
      { id: '7', name: 'Track Jacket', price: 75, description: 'Classic athletic style with modern updates', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d18?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Navy', 'Red'] } },
      { id: '8', name: 'Sports Bra', price: 40, description: 'Medium support for dynamic movement', image: 'https://images.unsplash.com/photo-1506629905607-c8d14c82ae07?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['XS', 'S', 'M', 'L'], color: ['Black', 'White', 'Pink'] } },
      { id: '9', name: 'Basketball Shoes', price: 140, description: 'Court-ready performance and style', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['7', '8', '9', '10', '11'], color: ['Black', 'White', 'Red'] } },
      { id: '10', name: 'Windbreaker Jacket', price: 65, description: 'Lightweight protection from the elements', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d18?w=400&h=400&fit=crop', category: 'fashion', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Navy', 'Green'] } }
    ],
    navigation: ['Home', 'Men', 'Women', 'Kids', 'Sale'],
    footer: {
      about: 'Nike Store is dedicated to bringing you the latest in athletic innovation and style.',
      contact: {
        email: 'hello@nikestore.com',
        phone: '+1 (555) 123-4567',
        address: '123 Athletic Way, Sports City, SC 12345'
      }
    },
    createdAt: new Date().toISOString()
  },
  electronics: {
    id: 'demo_electronics',
    brandName: 'TechHub',
    description: 'Premium electronics and gadgets for tech enthusiasts and professionals.',
    category: 'electronics',
    colorScheme: 'professional',
    hero: {
      title: 'TechHub - Innovation at Your Fingertips',
      subtitle: 'Discover cutting-edge technology products that enhance your digital lifestyle.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'
    },
    products: [
      { id: '1', name: 'Premium Wireless Headphones', price: 299, description: 'Industry-leading noise cancellation technology', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '2', name: 'Smart Fitness Watch', price: 399, description: 'Advanced health tracking with GPS and cellular', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '3', name: 'Wireless Charging Stand', price: 79, description: 'Fast 15W wireless charging with cooling fan', image: 'https://images.unsplash.com/photo-1609592900176-37ac9e29e1df?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '4', name: 'Portable 4K Monitor', price: 399, description: 'Ultra-portable 15.6" 4K display for professionals', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '5', name: 'Gaming Mechanical Keyboard', price: 159, description: 'RGB backlit with premium mechanical switches', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '6', name: 'Bluetooth Speaker Pro', price: 189, description: 'Premium sound with 360-degree audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '7', name: 'USB-C Hub Pro', price: 99, description: '11-in-1 hub with 4K HDMI and 100W charging', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '8', name: 'Wireless Mouse Pro', price: 79, description: 'Precision gaming mouse with 16,000 DPI', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '9', name: 'Smart LED Desk Lamp', price: 149, description: 'App-controlled with circadian rhythm lighting', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop', category: 'electronics' },
      { id: '10', name: 'Premium Phone Case', price: 49, description: 'Military-grade protection with wireless charging', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop', category: 'electronics' }
    ],
    navigation: ['Home', 'Computers', 'Audio', 'Smart Home', 'Accessories'],
    footer: {
      about: 'TechHub brings you the latest in technology innovation and premium electronics.',
      contact: {
        email: 'hello@techhub.com',
        phone: '+1 (555) 987-6543',
        address: '456 Tech Drive, Silicon Valley, CA 94025'
      }
    },
    createdAt: new Date().toISOString()
  },
  grocery: {
    id: 'demo_grocery',
    brandName: 'Fresh Market',
    description: 'Premium grocery store with fresh produce, organic options, and convenient delivery services.',
    category: 'grocery',
    colorScheme: 'nature',
    hero: {
      title: 'Fresh Market - Farm to Your Table',
      subtitle: 'Discover the freshest produce, organic foods, and pantry essentials delivered to your door.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'
    },
    products: [
      { id: '1', name: 'Organic Bananas', price: 4, description: 'Fresh organic bananas, 2 lbs', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '2', name: 'Free-Range Eggs', price: 6, description: 'Farm fresh free-range eggs, dozen', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '3', name: 'Organic Milk', price: 5, description: 'Whole organic milk, 1 gallon', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '4', name: 'Artisan Bread', price: 8, description: 'Fresh baked sourdough bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '5', name: 'Local Honey', price: 12, description: 'Raw wildflower honey, 16 oz', image: 'https://images.unsplash.com/photo-1587049016823-ba259645b2ca?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '6', name: 'Organic Spinach', price: 4, description: 'Fresh organic baby spinach, 5 oz', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '7', name: 'Wild Salmon', price: 18, description: 'Fresh wild-caught salmon, 1 lb', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '8', name: 'Organic Apples', price: 6, description: 'Crisp organic Honeycrisp apples, 3 lbs', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '9', name: 'Greek Yogurt', price: 7, description: 'Organic plain Greek yogurt, 32 oz', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', category: 'grocery' },
      { id: '10', name: 'Quinoa', price: 9, description: 'Organic tri-color quinoa, 1 lb', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', category: 'grocery' }
    ],
    navigation: ['Home', 'Produce', 'Dairy', 'Meat & Seafood', 'Pantry'],
    footer: {
      about: 'Fresh Market connects you with local farmers and producers to bring the freshest ingredients to your table.',
      contact: {
        email: 'hello@freshmarket.com',
        phone: '+1 (555) 246-8135',
        address: '456 Market Street, Fresh Valley, FV 12345'
      }
    },
    createdAt: new Date().toISOString()
  },
  home: {
    id: 'demo_home',
    brandName: 'Garden Oasis',
    description: 'Beautiful home decor and garden essentials to create your perfect living space.',
    category: 'home',
    colorScheme: 'nature',
    hero: {
      title: 'Garden Oasis - Transform Your Space',
      subtitle: 'Discover beautiful home and garden products that bring nature into your everyday life.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'
    },
    products: [
      { id: '1', name: 'Ceramic Planter Set', price: 89, description: 'Handcrafted ceramic planters in three sizes', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', category: 'home' },
      { id: '2', name: 'Bamboo Wind Chimes', price: 45, description: 'Soothing natural sounds for outdoor relaxation', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop', category: 'home' },
      { id: '3', name: 'Solar Garden Lights', price: 79, description: 'Eco-friendly LED pathway lighting set of 8', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop', category: 'home' },
      { id: '4', name: 'Outdoor Throw Pillows', price: 59, description: 'Weather-resistant cushions in vibrant patterns', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', category: 'home' },
      { id: '5', name: 'Natural Jute Area Rug', price: 199, description: 'Sustainable 6x9 rug perfect for any room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', category: 'home' },
      { id: '6', name: 'Wooden Garden Bench', price: 249, description: 'Teak wood bench with weather-resistant finish', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop', category: 'home' },
      { id: '7', name: 'Herb Garden Starter Kit', price: 35, description: 'Everything needed to grow fresh herbs indoors', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', category: 'home' },
      { id: '8', name: 'Macrame Wall Hanging', price: 69, description: 'Handwoven wall art in natural cotton', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', category: 'home' },
      { id: '9', name: 'Garden Tool Set', price: 89, description: 'Professional-grade tools with ergonomic handles', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop', category: 'home' },
      { id: '10', name: 'Recycled Glass Vases', price: 55, description: 'Set of 3 unique vases made from recycled materials', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop', category: 'home' }
    ],
    navigation: ['Home', 'Indoor Plants', 'Garden', 'Decor', 'Furniture'],
    footer: {
      about: 'Garden Oasis helps you create beautiful, sustainable living spaces that connect you with nature.',
      contact: {
        email: 'hello@gardenoasis.com',
        phone: '+1 (555) 456-7890',
        address: '789 Garden Lane, Green Valley, GV 56789'
      }
    },
    createdAt: new Date().toISOString()
  }
};

export default function DemoPage({ params }: DemoPageProps) {
  const [currentPage, setCurrentPage] = useState('home');
  const [device, setDevice] = useState('desktop');
  const [site, setSite] = useState<GeneratedSite | null>(null);

  useEffect(() => {
    const demoSite = demoSites[params.category];
    if (demoSite) {
      setSite(demoSite);
    }
  }, [params.category]);

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Demo Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Builder
          </Link>
        </div>
      </div>
    );
  }

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
              {site.brandName} Demo
            </h1>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {site.category} demo
            </span>
          </div>

          {/* Device Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 ${device === 'desktop' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 ${device === 'tablet' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 ${device === 'mobile' ? 'bg-navy-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <Link href="/" className="btn-primary flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Create Similar Store
            </Link>
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
            device === 'mobile' ? 'max-w-sm mx-auto' :
            device === 'tablet' ? 'max-w-2xl mx-auto' :
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
                  {site.brandName.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              <Eye className="h-4 w-4 text-gray-400" />
            </div>

            {/* Site Preview */}
            <EcommerceSitePreview
              site={site}
              currentPage={currentPage}
              device={device}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
