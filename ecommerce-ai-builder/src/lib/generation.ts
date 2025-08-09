// E-commerce site generation service

export interface GenerationRequest {
  brandName: string;
  description: string;
  category: string;
  colorScheme: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  variants?: {
    size?: string[];
    color?: string[];
  };
}

export interface GeneratedSite {
  id: string;
  brandName: string;
  description: string;
  category: string;
  colorScheme: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  products: Product[];
  navigation: string[];
  footer: {
    about: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  };
  createdAt: string;
}

// Sample product data by category
const productTemplates = {
  fashion: [
    { name: "Premium Cotton T-Shirt", price: 49, description: "Soft organic cotton tee with perfect fit", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
    { name: "Classic Denim Jacket", price: 129, description: "Timeless denim jacket for any occasion", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d18" },
    { name: "Comfortable Hoodie", price: 79, description: "Cozy hoodie for casual comfort", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7" },
    { name: "Elegant Dress", price: 159, description: "Perfect dress for special occasions", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8" },
    { name: "Versatile Jeans", price: 89, description: "High-quality denim for everyday wear", image: "https://images.unsplash.com/photo-1542272604-787c3835535d" },
    { name: "Summer Blouse", price: 69, description: "Light and airy blouse for warm days", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256" },
    { name: "Wool Sweater", price: 119, description: "Warm and stylish wool sweater", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105" },
    { name: "Athletic Leggings", price: 59, description: "High-performance leggings for active lifestyle", image: "https://images.unsplash.com/photo-1506629905607-c8d14c82ae07" },
    { name: "Casual Sneakers", price: 139, description: "Comfortable sneakers for daily wear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
    { name: "Designer Handbag", price: 249, description: "Elegant handbag for sophisticated style", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" }
  ],
  electronics: [
    { name: "Wireless Headphones", price: 199, description: "Premium noise-canceling headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
    { name: "Smart Watch", price: 299, description: "Advanced fitness tracking and notifications", image: "https://images.unsplash.com/photo-1544117519-31a4b719223d" },
    { name: "Laptop Stand", price: 79, description: "Ergonomic aluminum laptop stand", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46" },
    { name: "Portable Speaker", price: 129, description: "High-quality portable Bluetooth speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1" },
    { name: "Wireless Charger", price: 49, description: "Fast wireless charging pad", image: "https://images.unsplash.com/photo-1609592900176-37ac9e29e1df" },
    { name: "Gaming Mouse", price: 89, description: "Precision gaming mouse with RGB lighting", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7" },
    { name: "USB-C Hub", price: 69, description: "Multi-port USB-C hub for connectivity", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761" },
    { name: "Phone Case", price: 29, description: "Protective case with wireless charging support", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2" },
    { name: "Tablet Stylus", price: 99, description: "Precision stylus for digital art and notes", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c" },
    { name: "LED Desk Lamp", price: 119, description: "Adjustable LED lamp with USB charging", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0" }
  ],
  home: [
    { name: "Ceramic Vase", price: 89, description: "Handcrafted ceramic vase for home decor", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61" },
    { name: "Throw Pillow Set", price: 59, description: "Soft decorative pillows in various colors", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
    { name: "Wall Art Print", price: 39, description: "Modern abstract art print for wall decoration", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96" },
    { name: "Scented Candle", price: 29, description: "Premium soy candle with relaxing fragrance", image: "https://images.unsplash.com/photo-1602874801007-de88f4c85121" },
    { name: "Wooden Picture Frame", price: 49, description: "Elegant wooden frame for family photos", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
    { name: "Area Rug", price: 199, description: "Soft and durable area rug for living room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
    { name: "Table Lamp", price: 129, description: "Modern table lamp with adjustable brightness", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0" },
    { name: "Decorative Mirror", price: 179, description: "Stylish mirror to brighten any room", image: "https://images.unsplash.com/photo-1618220179428-22790b461013" },
    { name: "Plant Pot", price: 35, description: "Ceramic pot perfect for indoor plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411" },
    { name: "Storage Basket", price: 45, description: "Woven storage basket for organization", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" }
  ],
  beauty: [
    { name: "Hydrating Serum", price: 89, description: "Advanced hydrating serum for glowing skin", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" },
    { name: "Lipstick Set", price: 79, description: "Collection of premium lipsticks in trending colors", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
    { name: "Face Mask", price: 39, description: "Nourishing face mask for all skin types", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273" },
    { name: "Eye Cream", price: 69, description: "Anti-aging eye cream for delicate skin", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" },
    { name: "Foundation", price: 59, description: "Full coverage foundation for flawless finish", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273" },
    { name: "Mascara", price: 29, description: "Volumizing mascara for dramatic lashes", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273" },
    { name: "Perfume", price: 149, description: "Elegant fragrance with floral notes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601" },
    { name: "Makeup Brush Set", price: 99, description: "Professional makeup brushes for perfect application", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273" },
    { name: "Cleanser", price: 45, description: "Gentle cleanser for daily skincare routine", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" },
    { name: "Nail Polish Set", price: 35, description: "Collection of vibrant nail polish colors", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273" }
  ]
};

// Color scheme configurations
const colorSchemeStyles = {
  minimal: {
    primary: '#000000',
    secondary: '#F8F9FA',
    accent: '#6B7280',
    background: '#FFFFFF'
  },
  professional: {
    primary: '#1E3A8A',
    secondary: '#E5E7EB',
    accent: '#10B981',
    background: '#FFFFFF'
  },
  warm: {
    primary: '#F59E0B',
    secondary: '#FEF3C7',
    accent: '#92400E',
    background: '#FFFFFF'
  },
  nature: {
    primary: '#10B981',
    secondary: '#D1FAE5',
    accent: '#065F46',
    background: '#FFFFFF'
  },
  luxury: {
    primary: '#000000',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    background: '#FFFFFF'
  }
};

export async function generateEcommerceSite(request: GenerationRequest): Promise<GeneratedSite> {
  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const category = request.category || 'fashion';
  const products = productTemplates[category as keyof typeof productTemplates] || productTemplates.fashion;

  // Generate hero content based on category and description
  const heroTitles = {
    fashion: `${request.brandName} - Redefining Style`,
    electronics: `${request.brandName} - Tech That Inspires`,
    home: `${request.brandName} - Transform Your Space`,
    beauty: `${request.brandName} - Unleash Your Beauty`,
    sports: `${request.brandName} - Elevate Your Performance`,
    food: `${request.brandName} - Taste the Difference`,
    jewelry: `${request.brandName} - Luxury Redefined`,
    books: `${request.brandName} - Stories That Matter`
  };

  const heroSubtitles = {
    fashion: "Discover our curated collection of premium fashion pieces designed for the modern lifestyle.",
    electronics: "Cutting-edge technology products that enhance your digital experience.",
    home: "Beautiful home decor and furniture to create your perfect living space.",
    beauty: "Premium beauty products for your daily self-care routine.",
    sports: "High-performance gear for athletes and fitness enthusiasts.",
    food: "Artisanal food products sourced from the finest ingredients.",
    jewelry: "Exquisite jewelry pieces crafted with attention to detail.",
    books: "Carefully selected books to inspire and educate."
  };

  const generatedSite: GeneratedSite = {
    id: `site_${Date.now()}`,
    brandName: request.brandName,
    description: request.description,
    category: request.category,
    colorScheme: request.colorScheme,
    hero: {
      title: heroTitles[category as keyof typeof heroTitles] || `${request.brandName} - Premium Quality`,
      subtitle: heroSubtitles[category as keyof typeof heroSubtitles] || "Discover our exceptional collection of premium products.",
      image: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop`
    },
    products: products.map((product, index) => ({
      id: `product_${index + 1}`,
      name: product.name,
      price: product.price,
      description: product.description,
      image: `${product.image}?w=400&h=400&fit=crop`,
      category: request.category,
      variants: category === 'fashion' ? {
        size: ['XS', 'S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Navy', 'Gray']
      } : undefined
    })),
    navigation: ['Home', 'Shop', 'About', 'Contact'],
    footer: {
      about: `${request.brandName} is dedicated to providing exceptional ${category} products that enhance your lifestyle.`,
      contact: {
        email: `hello@${request.brandName.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, City, State 12345'
      }
    },
    createdAt: new Date().toISOString()
  };
  console.log('🚀 Generated site:', generatedSite);
  return generatedSite;
}

export function getColorSchemeStyles(scheme: string) {
  return colorSchemeStyles[scheme as keyof typeof colorSchemeStyles] || colorSchemeStyles.professional;
}
