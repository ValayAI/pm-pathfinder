
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { checkSupabaseConnection } from './lib/supabase'

// Create a function to handle mounting the app
const mountApp = async () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }
  
  // Check Supabase connection before mounting
  try {
    await checkSupabaseConnection();
  } catch (error) {
    console.warn("Supabase connection check failed, but continuing app mount:", error);
    // Continue with app mount even if connection check fails
  }
  
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to render the app:", error);
  }
};

// Mount the app and catch any uncaught errors
try {
  mountApp();
} catch (error) {
  console.error("Critical error during app initialization:", error);
  // Display a user-friendly error message on the page
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
        <h1>Unable to load the application</h1>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    `;
  }
}
