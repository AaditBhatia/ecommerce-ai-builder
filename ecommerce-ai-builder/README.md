# BuildStore - AI-Powered E-commerce Website Builder

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-purple)](https://stripe.com/)

A fully functional Next.js 15 web application that serves as an AI-powered e-commerce website builder, similar to Lovable.dev. Users can generate professional e-commerce websites for various product categories with just a text prompt.

![BuildStore Screenshot](https://via.placeholder.com/1200x600/f8f9fa/333333?text=BuildStore+AI+E-commerce+Builder)

## 🚀 Features

### Core Functionality
- **AI-Powered Generation**: Describe your store and watch AI generate a complete e-commerce website
- **Real-Time Preview**: See your store come to life with live preview across desktop, tablet, and mobile
- **Multiple Categories**: Support for fashion, electronics, home goods, beauty, sports, food, jewelry, and books
- **Custom Branding**: Personalize store name, colors, and design preferences

### E-commerce Pages Generated
- **Homepage**: Hero banner, featured products carousel, newsletter signup
- **Product Listing**: Grid layout with filters for category, price, and variants
- **Product Detail**: Image gallery with zoom, descriptions, variant selectors, reviews
- **Cart & Checkout**: Multi-step checkout with guest options and Stripe integration
- **User Account**: Order history, saved addresses, wishlist
- **Admin Dashboard**: Product management, order tracking, inventory, analytics

### Authentication & Payments
- **Supabase Auth**: Email/password and Google OAuth integration
- **Stripe Integration**: Secure payment processing for generated stores
- **User Dashboard**: Manage multiple generated stores and deployments

### Demo Examples
- **Fashion Store**: Nike.com-inspired clean navigation with dynamic filters
- **Electronics Store**: Amazon.com-style functional layout with detailed specs
- **Home Goods Store**: Wayfair.com-style vibrant imagery and category browsing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)
- **Package Manager**: Bun

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Supabase account
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/buildstore.git
cd buildstore
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Environment Setup
Copy the environment variables example:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

### 4. Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key to `.env.local`
3. Run the SQL migrations (create these tables):

```sql
-- Users table (auto-created by Supabase Auth)

-- Projects table for storing generated stores
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  color_scheme TEXT NOT NULL,
  status TEXT DEFAULT 'generating',
  generated_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the dashboard
3. Add them to your `.env.local` file
4. Configure webhook endpoints (optional for full functionality)

### 6. Run Development Server
```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure Environment Variables**:
   Add all environment variables from `.env.local` to your Vercel project settings.

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build Configuration**:
   The project includes a `netlify.toml` file with build settings.

2. **Environment Variables**:
   Add your environment variables in Netlify's dashboard.

3. **Deploy**:
   Connect your repository and deploy through Netlify's interface.

## 📱 Usage

### Creating Your First Store

1. **Sign Up**: Create an account or sign in with Google
2. **Describe Your Store**: Fill out the prompt with your business details
3. **Select Category**: Choose from fashion, electronics, home goods, etc.
4. **Pick Colors**: Select a color scheme that matches your brand
5. **Generate**: Click "Generate My Store" and watch AI create your site
6. **Preview**: View your store across different devices and pages
7. **Download**: Export your complete Next.js project as a ZIP file

### Managing Stores

- Access your dashboard to view all generated stores
- Edit, preview, or delete existing stores
- Download project files for custom deployment
- Track analytics and performance

## 🎨 Customization

### Adding New Categories
Add new categories in `src/lib/generation.ts`:
```typescript
const productTemplates = {
  // existing categories...
  yourcategory: [
    // your product templates
  ]
};
```

### Custom Color Schemes
Define new color schemes in `src/lib/generation.ts`:
```typescript
const colorSchemeStyles = {
  // existing schemes...
  yourscheme: {
    primary: '#your-color',
    secondary: '#your-color',
    accent: '#your-color',
    background: '#your-color'
  }
};
```

### Custom Templates
Modify the generation logic in `src/lib/generation.ts` to create custom e-commerce templates.

## 🛡️ Security

- Authentication handled by Supabase with Row Level Security
- Payment processing secured by Stripe
- Environment variables for sensitive data
- Input validation and sanitization
- HTTPS enforced in production

## 📊 Analytics

- User registration and login tracking
- Store generation metrics
- Download and deployment statistics
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.buildstore.com](https://docs.buildstore.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/buildstore/issues)
- **Email**: support@buildstore.com
- **Discord**: [Join our community](https://discord.gg/buildstore)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for backend services
- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for icons

---

Built with ❤️ by the BuildStore team
