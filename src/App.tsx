
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { SubscriptionProvider } from "./providers/SubscriptionProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Explore from "./pages/Explore";
import Resources from "./pages/Resources";
import Coaching from "./pages/Coaching";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <Toaster 
            position="top-center" 
            richColors 
            closeButton 
            expand={true}
            duration={4000}
            visibleToasts={3}
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
