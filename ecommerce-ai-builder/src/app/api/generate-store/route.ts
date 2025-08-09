import { NextRequest, NextResponse } from 'next/server';
import { generateEcommerceSite } from '@/lib/generation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userPrompt, storeName, analysis, preferences, userId } = body;

    // Validate required fields
    if (!userPrompt || !storeName || !analysis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('🚀 Generating e-commerce store:', {
      storeName,
      category: analysis.classification.productCategory,
      businessType: analysis.classification.businessType,
      features: preferences.features.length
    });

    // Generate the e-commerce site with AI-analyzed data
    const generationRequest = {
      brandName: storeName,
      description: userPrompt,
      category: analysis.classification.productCategory,
      colorScheme: preferences.colorScheme || analysis.design.colorScheme
    };

    // Simulate generation with enhanced data
    const generatedSite = await generateEcommerceSite(generationRequest);

    // Create a unique site ID
    const siteId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare the complete site data
    const siteData = {
      siteId,
      ...generatedSite,
      analysis,
      preferences,
      features: preferences.features,
      additionalNotes: preferences.additionalNotes,
      generatedAt: new Date().toISOString(),
      userId
    };

    // In production, save to database
    // For now, we'll return the site data

    return NextResponse.json({
      success: true,
      siteId,
      siteData,
      url: `https://${storeName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${siteId}.buildstore.app`
    });

  } catch (error) {
    console.error('Store generation failed:', error);

    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
