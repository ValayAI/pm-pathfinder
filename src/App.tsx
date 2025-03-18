
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

// Protected pages
import Explore from './pages/Explore';
import Resources from './pages/Resources';
import Chat from './pages/Chat';
import Coaching from './pages/Coaching';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          {/* Protected routes */}
          <Route 
            path="/explore" 
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/coaching" 
            element={
              <ProtectedRoute>
                <Coaching />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
