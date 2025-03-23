
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContainer from "@/components/chat/ChatContainer";

export function Chat() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <ChatContainer />
      </main>
      <Footer />
    </div>
  );
}

export default Chat;
