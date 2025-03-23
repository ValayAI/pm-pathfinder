
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a function to handle mounting the app
const mountApp = () => {
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
  }
};

// Mount the app
mountApp();
