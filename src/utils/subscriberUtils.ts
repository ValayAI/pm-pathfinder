
/**
 * Utility functions for managing subscribers
 */

// Get all subscribers from localStorage
export const getSubscribers = (): string[] => {
  try {
    const subscribers = localStorage.getItem('pm-pathfinder-subscribers');
    return subscribers ? JSON.parse(subscribers) : [];
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
};

// Add a new subscriber to localStorage
export const addSubscriber = (email: string): boolean => {
  try {
    const subscribers = getSubscribers();
    
    // Check if email already exists
    if (subscribers.includes(email)) {
      return false;
    }
    
    // Add new email
    subscribers.push(email);
    localStorage.setItem('pm-pathfinder-subscribers', JSON.stringify(subscribers));
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
};

// Check if an email is already subscribed
export const isSubscribed = (email: string): boolean => {
  const subscribers = getSubscribers();
  return subscribers.includes(email);
};
