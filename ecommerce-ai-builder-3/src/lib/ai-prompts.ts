// AI Prompt Templates for E-commerce Generation
// This module contains the structured prompts for analyzing and generating e-commerce websites

export interface BusinessClassification {
  businessType: 'retail' | 'wholesale' | 'marketplace';
  productCategory: string;
  keywords: string[];
}

export interface ProductTypes {
  physical: {
    detected: boolean;
    confidence: number;
    reasoning: string;
    examples: string[];
    implementation: string[];
  };
  digital: {
    detected: boolean;
    confidence: number;
    reasoning: string;
    examples: string[];
    implementation: string[];
  };
  services: {
    detected: boolean;
    confidence: number;
    reasoning: string;
    examples: string[];
    implementation: string[];
  };
}

export interface CompleteAnalysis {
  classification: BusinessClassification;
  productTypes: ProductTypes;
  targetAudience: {
    primary: string;
    age: string;
    interests: string[];
  };
  features: {
    essential: string[];
    recommended: string[];
    advanced: string[];
  };
  design: {
    style: string;
    colorScheme: string;
    inspiration: string[];
  };
}

export class AIPromptGenerator {

  // Step 1: Business Classification Prompt
  static getClassificationPrompt(userPrompt: string): string {
    return `You are an expert e-commerce business analyst performing initial classification.

<role>
Your task is to quickly classify a business idea to guide further analysis. Focus on understanding the core business model and industry.
</role>

<classification_criteria>
Business Type:
- retail: Selling directly to end consumers (B2C) - most common default
- wholesale: Selling in bulk to other businesses (B2B) - only if explicitly mentioned
- marketplace: Platform connecting multiple independent sellers - only if multi-vendor mentioned

Product Category:
Choose the primary industry focus: fashion, food, electronics, beauty, fitness, home, services, or general

Keywords:
Extract 10-15 meaningful terms that capture the essence of the business (exclude common words like "want", "create", "online")
</classification_criteria>

<intelligent_analysis>
Be precise in your classification:
- Don't assume marketplace just because they mention multiple products
- Don't assume wholesale unless B2B or bulk sales are explicit
- Choose the most specific category that fits, not just "general"
</intelligent_analysis>

<examples>
"I want to start a coffee shop with pastries" → retail, food, ["coffee", "shop", "pastries", "beverages", "cafe"]
"Online marketplace for local artisans" → marketplace, general, ["marketplace", "artisans", "local", "handmade", "crafts"]
"B2B office furniture supplier" → wholesale, home, ["furniture", "office", "supplier", "business", "wholesale", "desks", "chairs"]
</examples>

User's business idea: "${userPrompt}"

MOST CRITICAL INSTRUCTION:
OUTPUT ONLY THE FOLLOWING JSON FORMAT, NO SENTENCE AT THE BEGINNING OR AT THE END OF YOUR ANSWER:

{
  "businessType": "retail|wholesale|marketplace",
  "productCategory": "string",
  "keywords": ["string array"]
}`;
  }

  // Step 2: Product Types Analysis Prompt
  static getProductTypesPrompt(userPrompt: string, classification: BusinessClassification): string {
    return `You are analyzing what types of products/services a business will offer.

<context>
You are part of an AI system that helps users build e-commerce applications. Your specific role is to identify what types of products/services this business will offer.

Business Classification:
- Type: ${classification.businessType}
- Industry: ${classification.productCategory}
- Key Concepts: ${classification.keywords.join(', ')}
</context>

<your_task>
Based on the user's business description AND the classification context above, determine which product types apply:

Physical Products: Tangible items requiring inventory, storage, shipping
Digital Products: Downloadable/online content (ebooks, courses, software)
Services: Time-based or expertise offerings (consulting, appointments, classes)
</your_task>

<detection_rules>
- detected = true: Only if explicitly mentioned OR inherently required for this type of ${classification.productCategory} business
- confidence: 0.9+ for explicit mentions, 0.7-0.8 for inherent requirements, 0.5-0.6 for possible additions
- reasoning: One clear sentence explaining why (reference the business description)
- examples: Specific items mentioned or typical for this business
- implementation: What systems they'll need (be specific to their business)
</detection_rules>

<intelligent_guidance>
Use the classification to make smarter decisions:
- A ${classification.productCategory} business typically involves certain product types
- ${classification.businessType === 'marketplace' ? 'Marketplaces often have all three types depending on vendors' : ''}
- ${classification.businessType === 'wholesale' ? 'Wholesale typically focuses on physical products in bulk' : ''}
- Don't add product types just because they're common in the industry unless the user indicated them
</intelligent_guidance>

User's business idea: "${userPrompt}"

OUTPUT ONLY THE FOLLOWING JSON FORMAT:

{
  "physical": {
    "detected": boolean,
    "confidence": 0.0-1.0,
    "reasoning": "string",
    "examples": ["array"],
    "implementation": ["array"]
  },
  "digital": {
    "detected": boolean,
    "confidence": 0.0-1.0,
    "reasoning": "string",
    "examples": ["array"],
    "implementation": ["array"]
  },
  "services": {
    "detected": boolean,
    "confidence": 0.0-1.0,
    "reasoning": "string",
    "examples": ["array"],
    "implementation": ["array"]
  }
}`;
  }

  // Step 3: Target Audience Analysis
  static getTargetAudiencePrompt(userPrompt: string, classification: BusinessClassification): string {
    return `Analyze the target audience for this ${classification.productCategory} ${classification.businessType} business.

Business idea: "${userPrompt}"
Keywords: ${classification.keywords.join(', ')}

Identify:
1. Primary audience demographic
2. Age range
3. Key interests and values

OUTPUT JSON:
{
  "primary": "description of main customer segment",
  "age": "age range",
  "interests": ["array of interests"]
}`;
  }

  // Step 4: Feature Requirements
  static getFeaturesPrompt(userPrompt: string, classification: BusinessClassification, productTypes: ProductTypes): string {
    const hasPhysical = productTypes.physical.detected;
    const hasDigital = productTypes.digital.detected;
    const hasServices = productTypes.services.detected;

    return `Determine features needed for this e-commerce platform.

Business: ${classification.productCategory} ${classification.businessType}
Products: Physical(${hasPhysical}), Digital(${hasDigital}), Services(${hasServices})
Description: "${userPrompt}"

Categorize features as:
- Essential: Must-have for launch
- Recommended: Important for growth
- Advanced: Future enhancements

Consider industry-specific needs for ${classification.productCategory}.

OUTPUT JSON:
{
  "essential": ["array of must-have features"],
  "recommended": ["array of recommended features"],
  "advanced": ["array of advanced features"]
}`;
  }

  // Step 5: Design Recommendations
  static getDesignPrompt(userPrompt: string, classification: BusinessClassification): string {
    return `Recommend design approach for this ${classification.productCategory} e-commerce site.

Business: "${userPrompt}"
Industry: ${classification.productCategory}
Type: ${classification.businessType}

Suggest:
1. Design style (modern, classic, minimal, bold, etc.)
2. Color scheme recommendation
3. Reference sites for inspiration

OUTPUT JSON:
{
  "style": "design style",
  "colorScheme": "color scheme name",
  "inspiration": ["array of reference sites or styles"]
}`;
  }
}

// Mock AI service for development (replace with actual AI service)
export class AIAnalysisService {

  static async analyzeBusinessIdea(userPrompt: string): Promise<CompleteAnalysis> {
    // In production, these would be actual AI API calls
    // For now, we'll use intelligent defaults based on keywords

    const classification = this.smartClassification(userPrompt);
    const productTypes = this.smartProductTypes(userPrompt, classification);
    const targetAudience = this.smartAudience(userPrompt, classification);
    const features = this.smartFeatures(userPrompt, classification, productTypes);
    const design = this.smartDesign(userPrompt, classification);

    return {
      classification,
      productTypes,
      targetAudience,
      features,
      design
    };
  }

  private static smartClassification(prompt: string): BusinessClassification {
    const lower = prompt.toLowerCase();

    // Detect business type
    let businessType: 'retail' | 'wholesale' | 'marketplace' = 'retail';
    if (lower.includes('marketplace') || lower.includes('multi-vendor')) {
      businessType = 'marketplace';
    } else if (lower.includes('b2b') || lower.includes('wholesale') || lower.includes('bulk')) {
      businessType = 'wholesale';
    }

    // Detect category
    let productCategory = 'general';
    if (lower.includes('grocery') || lower.includes('food') || lower.includes('fresh')) {
      productCategory = 'food';
    } else if (lower.includes('fashion') || lower.includes('clothing') || lower.includes('apparel')) {
      productCategory = 'fashion';
    } else if (lower.includes('electronic') || lower.includes('tech') || lower.includes('gadget')) {
      productCategory = 'electronics';
    } else if (lower.includes('beauty') || lower.includes('cosmetic') || lower.includes('skincare')) {
      productCategory = 'beauty';
    } else if (lower.includes('home') || lower.includes('furniture') || lower.includes('decor')) {
      productCategory = 'home';
    } else if (lower.includes('fitness') || lower.includes('sport') || lower.includes('gym')) {
      productCategory = 'fitness';
    }

    // Extract keywords
    const keywords = prompt.match(/\b\w{4,}\b/g) || [];
    const filteredKeywords = keywords
      .filter(word => !['create', 'online', 'want', 'make', 'build', 'with'].includes(word.toLowerCase()))
      .slice(0, 15);

    return {
      businessType,
      productCategory,
      keywords: filteredKeywords
    };
  }

  private static smartProductTypes(prompt: string, classification: BusinessClassification): ProductTypes {
    const lower = prompt.toLowerCase();

    // Smart detection based on category and keywords
    const categoryDefaults = {
      food: { physical: true, digital: false, services: true },
      fashion: { physical: true, digital: false, services: false },
      electronics: { physical: true, digital: true, services: true },
      beauty: { physical: true, digital: false, services: true },
      fitness: { physical: true, digital: true, services: true },
      home: { physical: true, digital: false, services: true },
      general: { physical: true, digital: false, services: false }
    };

    const defaults = categoryDefaults[classification.productCategory as keyof typeof categoryDefaults] || categoryDefaults.general;

    return {
      physical: {
        detected: defaults.physical || lower.includes('product') || lower.includes('item'),
        confidence: 0.9,
        reasoning: `${classification.productCategory} businesses typically sell physical products`,
        examples: this.getProductExamples(classification.productCategory, 'physical'),
        implementation: ['Inventory management', 'Shipping integration', 'Product variants']
      },
      digital: {
        detected: defaults.digital || lower.includes('download') || lower.includes('digital'),
        confidence: defaults.digital ? 0.8 : 0.3,
        reasoning: `Digital products ${defaults.digital ? 'are common in' : 'could complement'} ${classification.productCategory}`,
        examples: this.getProductExamples(classification.productCategory, 'digital'),
        implementation: ['Digital delivery system', 'License management', 'Download tracking']
      },
      services: {
        detected: defaults.services || lower.includes('service') || lower.includes('consultation'),
        confidence: defaults.services ? 0.7 : 0.3,
        reasoning: `Services ${defaults.services ? 'enhance' : 'could expand'} ${classification.productCategory} offerings`,
        examples: this.getProductExamples(classification.productCategory, 'services'),
        implementation: ['Booking system', 'Calendar integration', 'Service packages']
      }
    };
  }

  private static getProductExamples(category: string, type: 'physical' | 'digital' | 'services'): string[] {
    const examples = {
      food: {
        physical: ['Fresh produce', 'Packaged goods', 'Beverages', 'Snacks'],
        digital: ['Recipe ebooks', 'Meal plans', 'Cooking courses'],
        services: ['Delivery', 'Catering', 'Meal prep']
      },
      fashion: {
        physical: ['Clothing', 'Shoes', 'Accessories', 'Bags'],
        digital: ['Style guides', 'Lookbooks', 'Fashion templates'],
        services: ['Personal styling', 'Alterations', 'Fashion consulting']
      },
      electronics: {
        physical: ['Smartphones', 'Laptops', 'Accessories', 'Gadgets'],
        digital: ['Software', 'Apps', 'Digital warranties'],
        services: ['Repair', 'Setup assistance', 'Tech support']
      },
      beauty: {
        physical: ['Skincare', 'Makeup', 'Hair products', 'Tools'],
        digital: ['Beauty guides', 'Tutorial videos', 'Product guides'],
        services: ['Consultations', 'Treatments', 'Beauty advice']
      },
      fitness: {
        physical: ['Equipment', 'Supplements', 'Apparel', 'Accessories'],
        digital: ['Workout plans', 'Training videos', 'Nutrition guides'],
        services: ['Personal training', 'Classes', 'Coaching']
      },
      home: {
        physical: ['Furniture', 'Decor', 'Appliances', 'Tools'],
        digital: ['Design templates', 'DIY guides', 'Planning tools'],
        services: ['Interior design', 'Installation', 'Consultation']
      }
    };

    return examples[category as keyof typeof examples]?.[type] || ['Products', 'Items', 'Goods'];
  }

  private static smartAudience(prompt: string, classification: BusinessClassification) {
    const audienceMap = {
      food: { primary: 'Health-conscious families and busy professionals', age: '25-45', interests: ['cooking', 'health', 'convenience', 'sustainability'] },
      fashion: { primary: 'Fashion-forward individuals seeking style and quality', age: '18-35', interests: ['fashion', 'trends', 'sustainability', 'self-expression'] },
      electronics: { primary: 'Tech enthusiasts and gadget lovers', age: '20-40', interests: ['technology', 'innovation', 'gaming', 'productivity'] },
      beauty: { primary: 'Beauty enthusiasts seeking quality products', age: '18-40', interests: ['skincare', 'makeup', 'wellness', 'self-care'] },
      fitness: { primary: 'Active individuals focused on health and fitness', age: '20-45', interests: ['fitness', 'health', 'sports', 'nutrition'] },
      home: { primary: 'Homeowners and design enthusiasts', age: '25-50', interests: ['interior design', 'DIY', 'comfort', 'aesthetics'] }
    };

    return audienceMap[classification.productCategory as keyof typeof audienceMap] || {
      primary: 'General consumers seeking quality products',
      age: '18-50',
      interests: ['shopping', 'value', 'quality', 'convenience']
    };
  }

  private static smartFeatures(prompt: string, classification: BusinessClassification, productTypes: ProductTypes) {
    const essential = [
      'Product catalog',
      'Shopping cart',
      'User authentication',
      'Payment processing',
      'Order management',
      'Search functionality',
      'Mobile responsive design'
    ];

    const recommended = [
      'Customer reviews',
      'Wishlist',
      'Email notifications',
      'Inventory tracking',
      'Analytics dashboard',
      'Social media integration'
    ];

    const advanced = [
      'AI recommendations',
      'Loyalty program',
      'Multi-language support',
      'Advanced analytics',
      'API integration',
      'Subscription model'
    ];

    // Add category-specific features
    if (classification.productCategory === 'food') {
      essential.push('Delivery scheduling');
      recommended.push('Recipe suggestions');
    } else if (classification.productCategory === 'fashion') {
      essential.push('Size guide');
      recommended.push('Virtual try-on');
    } else if (classification.productCategory === 'electronics') {
      essential.push('Product specifications');
      recommended.push('Comparison tool');
    }

    if (productTypes.services.detected) {
      essential.push('Booking system');
    }

    if (productTypes.digital.detected) {
      essential.push('Digital delivery');
    }

    return { essential, recommended, advanced };
  }

  private static smartDesign(prompt: string, classification: BusinessClassification) {
    const designMap = {
      food: { style: 'fresh and vibrant', colorScheme: 'nature', inspiration: ['Whole Foods', 'Fresh Direct', 'Instacart'] },
      fashion: { style: 'modern and elegant', colorScheme: 'minimal', inspiration: ['ASOS', 'Zara', 'Net-a-Porter'] },
      electronics: { style: 'tech-forward and clean', colorScheme: 'professional', inspiration: ['Apple', 'Best Buy', 'B&H Photo'] },
      beauty: { style: 'luxurious and clean', colorScheme: 'luxury', inspiration: ['Sephora', 'Glossier', 'Ulta'] },
      fitness: { style: 'energetic and bold', colorScheme: 'warm', inspiration: ['Nike', 'Gymshark', 'Lululemon'] },
      home: { style: 'cozy and inviting', colorScheme: 'warm', inspiration: ['West Elm', 'CB2', 'Article'] }
    };

    return designMap[classification.productCategory as keyof typeof designMap] || {
      style: 'modern and clean',
      colorScheme: 'professional',
      inspiration: ['Amazon', 'Shopify stores', 'Modern e-commerce']
    };
  }
}
