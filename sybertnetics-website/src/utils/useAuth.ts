import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // Debug: Check user claims if authenticated
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          console.log('User ID token claims:', idTokenResult.claims);
        } catch (error) {
          console.error('Error getting ID token:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
} 