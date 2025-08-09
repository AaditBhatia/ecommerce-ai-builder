'use client';

import { useState, useEffect } from 'react';
import { Check, Loader2, Database, Code, Globe, Zap, Brain, Settings } from 'lucide-react';

interface GenerationStep {
  step: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  timestamp: string;
  icon?: React.ReactNode;
  description?: string;
}

interface GenerationProgressProps {
  isGenerating: boolean;
  onComplete?: (result: any) => void;
  userPrompt: {
    brandName: string;
    description: string;
    category: string;
    colorScheme: string;
  };
  userId: string;
}

const stepConfigs = [
  {
    step: 'Analyzing user prompt with AI',
    icon: <Brain className="w-5 h-5" />,
    description: 'AI is understanding your business requirements and extracting key features'
  },
  {
    step: 'Building coding prompt',
    icon: <Settings className="w-5 h-5" />,
    description: 'Converting business requirements into technical specifications'
  },
  {
    step: 'Initializing WASP project',
    icon: <Zap className="w-5 h-5" />,
    description: 'Setting up the project structure and cloning template repository'
  },
  {
    step: 'Generating database and backend',
    icon: <Database className="w-5 h-5" />,
    description: 'Creating database schema, migrations, and API endpoints'
  },
  {
    step: 'Generating frontend pages',
    icon: <Code className="w-5 h-5" />,
    description: 'Building React components and pages for your e-commerce store'
  },
  {
    step: 'Publishing application',
    icon: <Globe className="w-5 h-5" />,
    description: 'Deploying your store and making it live on the internet'
  }
];

export default function GenerationProgress({
  isGenerating,
  onComplete,
  userPrompt,
  userId
}: GenerationProgressProps) {
  const [steps, setSteps] = useState<GenerationStep[]>(
    stepConfigs.map(config => ({
      ...config,
      status: 'pending' as const,
      timestamp: ''
    }))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isGenerating) {
      startGeneration();
    }
  }, [isGenerating]);

  const startGeneration = async () => {
    try {
      setError(null);

      // Simulate step-by-step progress
      for (let i = 0; i < steps.length; i++) {
        // Mark current step as in-progress
        setSteps(prev => prev.map((step, index) =>
          index === i
            ? { ...step, status: 'in-progress', timestamp: new Date().toISOString() }
            : step
        ));
        setCurrentStep(i);

        // Simulate processing time for each step
        const processingTimes = [2000, 1500, 2500, 3000, 3500, 2000]; // milliseconds
        await new Promise(resolve => setTimeout(resolve, processingTimes[i]));

        // Mark step as completed
        setSteps(prev => prev.map((step, index) =>
          index === i
            ? { ...step, status: 'completed' }
            : step
        ));
      }

      // Call the actual API after showing the progress
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userPrompt,
          userId
        }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const result = await response.json();

      if (onComplete) {
        onComplete(result.project);
      }

    } catch (error) {
      console.error('Generation failed:', error);
      setError(error instanceof Error ? error.message : 'Generation failed');

      // Mark current step as failed
      setSteps(prev => prev.map((step, index) =>
        index === currentStep
          ? { ...step, status: 'failed' }
          : step
      ));
    }
  };

  const getStepIcon = (step: GenerationStep, index: number) => {
    if (step.status === 'completed') {
      return <Check className="w-5 h-5 text-green-600" />;
    } else if (step.status === 'in-progress') {
      return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    } else if (step.status === 'failed') {
      return <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>;
    } else {
      return stepConfigs[index]?.icon || <div className="w-5 h-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStepColor = (step: GenerationStep) => {
    switch (step.status) {
      case 'completed':
        return 'text-green-600 border-green-200 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'failed':
        return 'text-red-600 border-red-200 bg-red-50';
      default:
        return 'text-gray-400 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Building Your Store
        </h2>
        <p className="text-slate-300">
          Creating "{userPrompt.brandName}" - your {userPrompt.category} e-commerce website
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex items-start p-6 rounded-2xl border-2 transition-all duration-300 ${getStepColor(step)}`}
          >
            {/* Step Number & Icon */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                {getStepIcon(step, index)}
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  Step {index + 1}: {step.step}
                </h3>
                {step.timestamp && (
                  <span className="text-sm opacity-75">
                    {new Date(step.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>

              <p className="text-sm opacity-90 mb-3">
                {stepConfigs[index]?.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    step.status === 'completed' ? 'w-full bg-current' :
                    step.status === 'in-progress' ? 'w-3/4 bg-current animate-pulse' :
                    'w-0 bg-current'
                  }`}
                />
              </div>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-20 w-0.5 h-8 bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-600 rounded-lg">
          <h3 className="text-red-400 font-semibold mb-2">Generation Failed</h3>
          <p className="text-red-300 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success Message */}
      {steps.every(step => step.status === 'completed') && !error && (
        <div className="mt-6 p-6 bg-green-900/50 border border-green-600 rounded-lg text-center">
          <Check className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h3 className="text-green-400 font-semibold text-xl mb-2">
            Your Store is Ready! 🎉
          </h3>
          <p className="text-green-300">
            Your full-stack e-commerce application has been generated and deployed successfully.
          </p>
        </div>
      )}

      {/* Technical Details */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-white font-medium mb-3">What's being generated:</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div>• WASP full-stack application</div>
          <div>• PostgreSQL database schema</div>
          <div>• React frontend components</div>
          <div>• Database migrations</div>
          <div>• API routes and actions</div>
          <div>• Deployment configuration</div>
        </div>
      </div>
    </div>
  );
}
