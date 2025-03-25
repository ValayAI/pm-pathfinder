
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContainer from "@/components/chat/ChatContainer";
import { useAuth } from "@/providers/AuthProvider";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

export function Chat() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
        {user ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="title-badge bg-purple-50 dark:bg-purple-950/50">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>AI Coaching</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Accelerate your PM career</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Get expert product management advice and career guidance whenever you need it
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border shadow-md overflow-hidden">
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
