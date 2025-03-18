
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Get the Clerk publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  if (!PUBLISHABLE_KEY) {
    // If we're in development, show a more helpful error
    if (import.meta.env.DEV) {
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded-md my-4 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2">Authentication Configuration Error</h2>
          <p className="mb-2">Missing Clerk Publishable Key. To fix this issue:</p>
          <ol className="list-decimal pl-5 mb-3 space-y-1">
            <li>Sign up for a free account at <a href="https://clerk.dev/" className="text-blue-600 underline">https://clerk.dev/</a></li>
            <li>Create a new application in the Clerk dashboard</li>
            <li>Get your publishable key from the API Keys section</li>
            <li>Create a <code className="bg-gray-100 px-1 rounded">.env</code> file in your project root</li>
            <li>Add this line: <code className="bg-gray-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code></li>
            <li>Restart your development server</li>
          </ol>
          <p>Then authentication will work properly in your application.</p>
        </div>
      );
    }
    
    // In production, don't show sensitive instructions
    return <div>Authentication configuration error. Please contact support.</div>;
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
        variables: {
          colorPrimary: isDarkMode ? '#a855f7' : '#7e22ce',
        }
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/"
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
