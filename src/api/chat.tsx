
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
  
  // PM Coach persona - pattern matching for demo purposes
  let response = "";
  
  if (userMessage.includes("generate a product roadmap")) {
    // Mock roadmap generation response
    response = `RATIONALE:
I organized this roadmap based on the following principles:
1. Quick wins first: Low effort, high impact features are prioritized in Quarter 1
2. Dependencies: Features that depend on others are scheduled after their dependencies
3. Strategic balance: Each quarter has a mix of feature types to maintain momentum
4. Resource allocation: Distributed high-effort items across quarters to balance workload

ROADMAP:
{
  "quarters": [
    {
      "quarter": "Quarter 1",
      "theme": "Quick Wins & Foundation",
      "features": [
        {"name": "Onboarding Flow Optimization", "description": "Improve the user onboarding experience", "effort": "Low", "impact": "High"},
        {"name": "Mobile App Bug Fixes", "description": "Fix critical bugs in the mobile application", "effort": "Low", "impact": "Medium"}
      ]
    },
    {
      "quarter": "Quarter 2",
      "theme": "Strategic Enhancements",
      "features": [
        {"name": "Advanced Analytics Dashboard", "description": "Comprehensive analytics for better insights", "effort": "High", "impact": "High"}
      ]
    }
  ]
}`;
  }
  else if (userMessage.includes("interview") || userMessage.includes("interviewing")) {
    response = "As your PM Coach, here's my advice for interviews:\n\n" +
      "1. Product sense - Practice analyzing products and suggesting improvements\n" +
      "2. Analytical thinking - Work on market sizing and metrics analysis\n" +
      "3. Strategy - Be ready to discuss prioritization frameworks like RICE\n" +
      "4. Leadership - Prepare stories about influencing without authority\n\n" +
      "Would you like me to suggest some practice questions for your next PM interview?";
  }
  else if (userMessage.includes("roadmap") || userMessage.includes("prioritiz")) {
    response = "As your PM Coach, here's my guidance on roadmapping:\n\n" +
      "• Start with clear objectives aligned with company strategy\n" +
      "• Focus on outcomes rather than features\n" +
      "• Use a prioritization framework (RICE, WSJF, Kano model)\n" +
      "• Balance between customer value, business value, and technical effort\n" +
      "• Keep it flexible to adapt to changing market conditions\n\n" +
      "Which area of roadmap planning do you need help with?";
  }
  else if (userMessage.includes("metrics") || userMessage.includes("kpi")) {
    response = "As your PM Coach, I recommend these key product metrics:\n\n" +
      "• Acquisition: CAC, conversion rates, traffic sources\n" +
      "• Activation: onboarding completion, feature adoption rates\n" +
      "• Retention: churn rate, retention cohorts, NPS/CSAT\n" +
      "• Revenue: ARPU, LTV, expansion revenue\n" +
      "• Referral: virality coefficient, referral rates\n\n" +
      "For career growth, focus on metrics that demonstrate your business impact. Which metrics would be most valuable for your product?";
  }
  else if (userMessage.includes("career") || userMessage.includes("promotion")) {
    response = "As your PM Coach, here are my top tips for advancing your product management career:\n\n" +
      "1. Demonstrate business impact with quantifiable metrics\n" +
      "2. Build strong cross-functional relationships, especially with engineering\n" +
      "3. Develop expertise in your product domain through continuous learning\n" +
      "4. Practice strategic thinking and improve your communication skills\n" +
      "5. Consider whether you want to pursue a specialist path or management track\n\n" +
      "What specific area of career development are you focusing on right now?";
  }
  else {
    response = "I'm your AI PM Coach, here to help you excel in product management. I can assist with:\n\n" +
      "• Career guidance and advancement strategies\n" +
      "• Interview preparation and practice\n" +
      "• Product strategy and decision frameworks\n" +
      "• Roadmapping and prioritization techniques\n" +
      "• Stakeholder management and communication\n\n" +
      "What specific area of your PM journey can I help with today?";
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
