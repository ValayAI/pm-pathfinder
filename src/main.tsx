
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a function to handle mounting the app
const mountApp = async () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }
  
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to render the app:", error);
    // Display a user-friendly error message
    rootElement.innerHTML = `
      <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
        <h1>Unable to load the application</h1>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
        <p style="color: #666; font-size: 14px;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
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
        <p style="color: #666; font-size: 14px;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
}
