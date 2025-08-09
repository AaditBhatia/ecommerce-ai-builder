import { NextRequest, NextResponse } from 'next/server';
import { generateFullStackEcommerce } from '@/lib/ai-generation';
import { db } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, description, category, colorScheme, userId } = body;

    // Validate required fields
    if (!brandName || !description || !category || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Start the AI generation pipeline
    const userPrompt = {
      description,
      brandName,
      category,
      colorScheme: colorScheme || 'professional'
    };

    console.log('🚀 Starting full-stack e-commerce generation for:', brandName);

    // Generate the complete application
    const result = await generateFullStackEcommerce(userPrompt);

    // Save the project to database with all generation details
    try {
      const project = await db.createProject({
        user_id: userId,
        name: brandName,
        description: description,
        category: category,
        color_scheme: colorScheme,
        status: 'completed',
        generated_data: result as any,
        site_url: result.url,
        is_public: false,
        view_count: 0
      });

      return NextResponse.json({
        success: true,
        project: {
          id: project.id,
          projectId: result.projectId,
          url: result.url,
          gitRepo: result.gitRepo,
          generationSteps: result.generationSteps
        }
      });

    } catch (dbError) {
      console.error('Failed to save to database:', dbError);

      // Return the generation result even if DB save fails
      return NextResponse.json({
        success: true,
        project: {
          projectId: result.projectId,
          url: result.url,
          gitRepo: result.gitRepo,
          generationSteps: result.generationSteps
        },
        warning: 'Generated successfully but failed to save to database'
      });
    }

  } catch (error) {
    console.error('Generation failed:', error);

    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET route for checking generation status (for real-time updates)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json(
      { error: 'Missing projectId parameter' },
      { status: 400 }
    );
  }

  try {
    // In a real implementation, this would check the actual generation status
    // For now, we'll return a mock status
    return NextResponse.json({
      projectId,
      status: 'completed',
      steps: [
        { step: 'Analyzing user prompt with AI', status: 'completed', timestamp: new Date().toISOString() },
        { step: 'Building coding prompt', status: 'completed', timestamp: new Date().toISOString() },
        { step: 'Initializing WASP project', status: 'completed', timestamp: new Date().toISOString() },
        { step: 'Generating database and backend', status: 'completed', timestamp: new Date().toISOString() },
        { step: 'Generating frontend pages', status: 'completed', timestamp: new Date().toISOString() },
        { step: 'Publishing application', status: 'completed', timestamp: new Date().toISOString() }
      ]
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get generation status' },
      { status: 500 }
    );
  }
}
