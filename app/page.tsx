'use client';

import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

export default function Home() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    // Initialize Vapi with your API key
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || '');
    setVapi(vapiInstance);
  }, []);

  const startCall = async () => {
    if (!vapi) return;

    const assistantOptions = {
      name: "MindfulAI Therapist",
      firstMessage: "Hello, I'm your AI therapist. I'm here to listen and support you. How are you feeling today?",
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2",
        language: "en-US" as const,
      },
      voice: {
        provider: "11labs" as const,
        voiceId: "21m00Tcm4TlvDq8ikWAM", // Calm, professional voice
      },
      model: {
        provider: "openai" as const,
        model: "gpt-4" as const,
        messages: [
          {
            role: "system" as const,
            content: `You are an empathetic AI therapist named MindfulAI. Your role is to:
1. Listen actively and respond with understanding
2. Ask thoughtful, open-ended questions
3. Provide gentle guidance and support
4. Maintain professional boundaries
5. Encourage self-reflection
6. Use therapeutic techniques like active listening and validation
7. Keep responses concise but meaningful
8. Remember this is not a replacement for professional help

Important guidelines:
- Never diagnose or prescribe medication
- Always encourage seeking professional help for serious concerns
- Maintain a calm, supportive tone
- Focus on the present moment and feelings
- Use therapeutic language that's accessible and clear`
          }
        ],
      },
    };

    try {
      setIsCallActive(true);
      await vapi.start(assistantOptions);
    } catch (error) {
      console.error('Error starting call:', error);
      setIsCallActive(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">MindfulAI</h1>
          <p className="text-gray-600 mb-8">Your AI Therapist Companion</p>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Welcome to Your Safe Space</h2>
            <p className="text-gray-700 mb-4">
              I'm here to listen and support you. Whether you're feeling stressed, anxious, or just need someone to talk to,
              I'm ready to have a meaningful conversation with you.
            </p>
            <p className="text-sm text-gray-500 italic">
              Note: This is a supportive tool and not a replacement for professional mental health services.
            </p>
          </div>

          <button
            onClick={startCall}
            disabled={isCallActive}
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-200 ${
              isCallActive
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105'
            }`}
          >
            {isCallActive ? 'Session in Progress...' : 'Start Your Session'}
          </button>
        </div>
      </div>
    </main>
  );
} 