
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"; // Switch to Sonner
import Index from './pages/Index';
import Explore from './pages/Explore';
import Resources from './pages/Resources';
import Chat from './pages/Chat';
import Coaching from './pages/Coaching';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
