
// This file would be used in a real backend implementation
// In a frontend-only app, we'll create a mock implementation

export async function chatWithOpenAI(message: string): Promise<string> {
  // In a real implementation, this would call the OpenAI API
  // For now, we'll use a mock response with a delay to simulate network request
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock responses based on user input
      if (message.toLowerCase().includes("interview")) {
        resolve(
          "For PM interviews, focus on these key areas:\n\n" +
          "1. Product sense - Be ready to discuss product improvements and new feature ideas\n" +
          "2. Analytical thinking - Practice market sizing and metrics analysis\n" +
          "3. Strategic thinking - Prepare to discuss prioritization frameworks\n" +
          "4. Execution - Be ready to talk about how you'd build and launch features\n\n" +
          "Would you like some example questions to practice with?"
        );
      } else if (message.toLowerCase().includes("roadmap")) {
        resolve(
          "When building a product roadmap, consider these best practices:\n\n" +
          "• Start with your product vision and strategy\n" +
          "• Focus on outcomes rather than features\n" +
          "• Prioritize using data and customer feedback (consider RICE or WSJF frameworks)\n" +
          "• Keep it flexible and revisit quarterly\n" +
          "• Communicate clearly with all stakeholders"
        );
      } else if (message.toLowerCase().includes("stakeholder")) {
        resolve(
          "Effective stakeholder management is crucial for PMs. Here's a framework:\n\n" +
          "1. Identify & map: List all stakeholders and their influence/interest\n" +
          "2. Understand needs: What are their priorities and concerns?\n" +
          "3. Communicate: Tailor your communication style to each stakeholder\n" +
          "4. Build trust: Deliver on promises and be transparent\n" +
          "5. Manage conflicts: Address disagreements early and find win-win solutions"
        );
      } else {
        resolve(
          "As your PM coach, I'm here to help with:\n\n" +
          "• Interview preparation\n" +
          "• Career guidance\n" +
          "• Product strategy\n" +
          "• Roadmap planning\n" +
          "• Stakeholder management\n" +
          "• Metrics and analytics\n\n" +
          "What specific area of product management can I assist you with today?"
        );
      }
    }, 1500);
  });
}
