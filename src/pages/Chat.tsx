
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContainer from "@/components/chat/ChatContainer";
import { useAuth } from "@/providers/AuthProvider";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";

export function Chat() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow page-container max-w-4xl pt-24 md:pt-28">
        {user ? (
          <ChatContainer />
        ) : (
          <PMCoachTeaser />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Chat;
