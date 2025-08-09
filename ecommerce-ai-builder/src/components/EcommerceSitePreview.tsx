'use client';

import { GeneratedSite, getColorSchemeStyles } from '@/lib/generation';
import { ShoppingCart, Heart, Star, Plus, Minus, Search, Menu, User } from 'lucide-react';

interface EcommerceSitePreviewProps {
  site: GeneratedSite;
  currentPage: string;
  device: string;
}

export default function EcommerceSitePreview({ site, currentPage, device }: EcommerceSitePreviewProps) {
  const colorStyles = getColorSchemeStyles(site.colorScheme);
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  const renderNavigation = () => (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold" style={{ color: colorStyles.primary }}>
            {site.brandName}
          </h1>
        </div>

        {!isMobile ? (
          <div className="flex items-center space-x-6">
            {site.navigation.map((item, index) => (
              <a key={index} href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                {item}
              </a>
            ))}
          </div>
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}

        <div className="flex items-center space-x-4">
          {!isMobile && <Search className="h-5 w-5 text-gray-600" />}
          <User className="h-5 w-5 text-gray-600" />
          <div className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHomepage = () => (
    <div>
      {renderNavigation()}

      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">{site.hero.title}</h1>
          <p className="text-sm md:text-xl mb-6">{site.hero.subtitle}</p>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg shadow-lg"
            style={{ backgroundColor: colorStyles.accent }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Featured Products</h2>
          <div className={`grid ${isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-4'} gap-4 md:gap-6`}>
            {site.products.slice(0, isMobile ? 4 : isTablet ? 6 : 8).map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: colorStyles.primary }}>
                      ${product.price}
                    </span>
                    <button
                      className="px-3 py-1 text-white text-xs rounded"
                      style={{ backgroundColor: colorStyles.accent }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for latest products and exclusive offers.</p>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="px-6 py-3 text-white font-semibold rounded-lg"
              style={{ backgroundColor: colorStyles.accent }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProductListing = () => (
    <div>
      {renderNavigation()}

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">All Products</h1>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {!isMobile && (
            <div className="w-64 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {['All', 'New Arrivals', 'Sale', 'Featured'].map((cat, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map((range, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid ${isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-4'} gap-4 md:gap-6`}>
              {site.products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(124)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg" style={{ color: colorStyles.primary }}>
                        ${product.price}
                      </span>
                      <button
                        className="px-3 py-1 text-white text-xs rounded"
                        style={{ backgroundColor: colorStyles.accent }}
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductDetail = () => {
    const product = site.products[0];
    return (
      <div>
        {renderNavigation()}

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded">
                    <img
                      src={product.image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(124 reviews)</span>
              </div>

              <p className="text-2xl font-bold mb-6" style={{ color: colorStyles.primary }}>
                ${product.price}
              </p>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {product.variants && (
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Size</h3>
                    <div className="flex space-x-2">
                      {product.variants.size?.map((size, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 border border-gray-300 rounded hover:border-gray-500"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Color</h3>
                    <div className="flex space-x-2">
                      {product.variants.color?.map((color, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 border border-gray-300 rounded hover:border-gray-500"
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded">
                  <button className="p-2">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2">1</span>
                  <button className="p-2">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  className="flex-1 px-6 py-3 text-white font-semibold rounded-lg"
                  style={{ backgroundColor: colorStyles.accent }}
                >
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>• Free shipping on orders over $100</p>
                <p>• 30-day return policy</p>
                <p>• Secure payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div>
      {renderNavigation()}

      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {site.products.slice(0, 2).map((product, index) => (
              <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">Size: M, Color: Black</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button><Minus className="h-4 w-4" /></button>
                  <span>1</span>
                  <button><Plus className="h-4 w-4" /></button>
                </div>
                <span className="font-semibold">${product.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold" style={{ color: colorStyles.primary }}>
                ${site.products.slice(0, 2).reduce((sum, p) => sum + p.price, 0)}
              </span>
            </div>
            <button
              className="w-full py-3 text-white font-semibold rounded-lg"
              style={{ backgroundColor: colorStyles.accent }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const pageRenderers = {
    home: renderHomepage,
    shop: renderProductListing,
    product: renderProductDetail,
    cart: renderCart
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {pageRenderers[currentPage as keyof typeof pageRenderers]()}
    </div>
  );
}
