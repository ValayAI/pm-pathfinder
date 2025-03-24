
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContainer from "@/components/chat/ChatContainer";
import { useAuth } from "@/providers/AuthProvider";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function Chat() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-grow container mx-auto pt-24 md:pt-28 pb-12 px-4">
        {user ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI Coaching
              </Badge>
              <h1 className="text-3xl font-bold mb-4">PM Coach Assistant</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Get instant answers to your product management questions
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
