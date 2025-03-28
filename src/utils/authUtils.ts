
// Track failed login attempts to prevent brute force attacks
const failedAttempts = new Map<string, { count: number, lastAttempt: number }>();
export const MAX_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Check if login attempts exceed rate limit
 */
export const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const userAttempts = failedAttempts.get(email);

  if (!userAttempts) {
    return true;
  }

  if (now - userAttempts.lastAttempt > LOCKOUT_DURATION) {
    failedAttempts.set(email, { count: 0, lastAttempt: now });
    return true;
  }

  if (userAttempts.count >= MAX_ATTEMPTS) {
    const remainingLockout = Math.ceil((LOCKOUT_DURATION - (now - userAttempts.lastAttempt)) / 60000);
    console.log(`Account temporarily locked. Try again in ${remainingLockout} minutes.`);
    return false;
  }

  return true;
};

/**
 * Record a failed login attempt
 */
export const recordFailedAttempt = (email: string) => {
  const now = Date.now();
  const userAttempts = failedAttempts.get(email);
  
  if (!userAttempts) {
    failedAttempts.set(email, { count: 1, lastAttempt: now });
  } else {
    failedAttempts.set(email, { 
      count: userAttempts.count + 1, 
      lastAttempt: now 
    });
  }
};

/**
 * Reset failed login attempts for an email
 */
export const resetAttempts = (email: string) => {
  failedAttempts.delete(email);
};
