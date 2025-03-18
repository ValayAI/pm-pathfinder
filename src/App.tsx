
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import AuthProvider from './providers/AuthProvider';
import Index from './pages/Index';
import Explore from './pages/Explore';
import Resources from './pages/Resources';
import Chat from './pages/Chat';
import Coaching from './pages/Coaching';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import NotFound from './pages/NotFound';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Protected routes */}
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/coaching" element={
            <ProtectedRoute>
              <Coaching />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/success" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />
          
          {/* Auth routes */}
          <Route path="/sign-in" element={
            <SignedOut>
              <SignIn />
            </SignedOut>
          } />
          <Route path="/sign-up" element={
            <SignedOut>
              <SignUp />
            </SignedOut>
          } />
          
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
