
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContainer from "@/components/chat/ChatContainer";
import { useAuth } from "@/providers/AuthProvider";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageSquare } from "lucide-react";

export function Chat() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-grow container mx-auto pt-24 md:pt-28 pb-12 px-4">
        {user ? (
          <div className="max-w-4xl mx-auto">
            {/* Updated title section to match Pricing page */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <MessageSquare className="h-3.5 w-3.5 mr-2" />
                <span className="text-sm font-medium">AI Coaching</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Accelerate your PM career</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Get expert product management advice and career guidance whenever you need it
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border shadow-sm overflow-hidden">
              <ChatContainer />
            </div>
          </div>
        ) : (
          <PMCoachTeaser />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Chat;
