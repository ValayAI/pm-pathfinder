
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Suspense, ErrorBoundary } from 'react';
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
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from './providers/AuthProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import './App.css';

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Reload page
      </button>
    </div>
  </div>
);

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

class AppErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <AppErrorBoundary>
      <Router>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <AuthProvider>
            <SubscriptionProvider>
              <Suspense fallback={<Loading />}>
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
              </Suspense>
            </SubscriptionProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </AppErrorBoundary>
  );
}

export default App;
