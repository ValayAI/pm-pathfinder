
// This is a mock implementation of the OpenAI API integration.
// In a real application, this would be a server-side endpoint that calls the OpenAI API.

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
}

// In a real implementation, this would make a call to OpenAI's API
export async function handleChatRequest(request: ChatRequest): Promise<ChatResponse> {
  const userMessage = request.message.toLowerCase();
  
  // Simple pattern matching for demo purposes
  let response = "";
  
  if (userMessage.includes("interview") || userMessage.includes("interviewing")) {
    response = "For PM interviews, I recommend focusing on these key areas:\n\n" +
      "1. Product sense - Practice analyzing products and suggesting improvements\n" +
      "2. Analytical thinking - Work on market sizing and metrics analysis\n" +
      "3. Strategy - Be ready to discuss prioritization frameworks like RICE\n" +
      "4. Leadership - Prepare stories about influencing without authority\n\n" +
      "Would you like me to suggest some practice questions?";
  }
  else if (userMessage.includes("roadmap") || userMessage.includes("prioritiz")) {
    response = "When creating product roadmaps, consider these best practices:\n\n" +
      "• Start with clear objectives aligned with company strategy\n" +
      "• Focus on outcomes rather than features\n" +
      "• Use a prioritization framework (RICE, WSJF, Kano model)\n" +
      "• Balance between customer value, business value, and technical effort\n" +
      "• Keep it flexible to adapt to changing market conditions";
  }
  else if (userMessage.includes("metrics") || userMessage.includes("kpi")) {
    response = "Effective product metrics typically fall into these categories:\n\n" +
      "• Acquisition: CAC, conversion rates, traffic sources\n" +
      "• Activation: onboarding completion, feature adoption rates\n" +
      "• Retention: churn rate, retention cohorts, NPS/CSAT\n" +
      "• Revenue: ARPU, LTV, expansion revenue\n" +
      "• Referral: virality coefficient, referral rates\n\n" +
      "The key is selecting a few North Star metrics that align with your product strategy.";
  }
  else if (userMessage.includes("career") || userMessage.includes("promotion")) {
    response = "To advance your product management career:\n\n" +
      "1. Demonstrate business impact with metrics\n" +
      "2. Build cross-functional relationships\n" +
      "3. Develop expertise in your product domain\n" +
      "4. Practice strategic thinking and communication\n" +
      "5. Consider whether you want to pursue a specialist path or management track\n\n" +
      "What specific area would you like more advice on?";
  }
  else {
    response = "I'm your AI PM coach. I can help you with:\n\n" +
      "• Interview preparation\n" +
      "• Career guidance\n" +
      "• Product strategy and roadmapping\n" +
      "• Metrics and analytics\n" +
      "• Stakeholder management\n\n" +
      "What specific area of product management can I assist you with today?";
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { message: response };
}

// Mock API endpoint handler
export default async function handler(req: Request) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const result = await handleChatRequest({ message: body.message });
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to process request' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405,
    });
  }
}
