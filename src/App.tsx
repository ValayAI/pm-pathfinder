
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Explore from './pages/Explore';
import Resources from './pages/Resources';
import Coaching from './pages/Coaching';
import Roadmap from './pages/Roadmap';
import Navbar from './components/Navbar';
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from './providers/AuthProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <AuthProvider>
          <SubscriptionProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Protected Routes */}
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/coaching" element={<ProtectedRoute><Coaching /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Navigate to="/settings" replace /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
