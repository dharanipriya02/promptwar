import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, name: u.displayName || 'Traveler', email: u.email, avatar: u.photoURL } : null);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    if (!auth.currentUser && typeof auth.signInWithPopup !== 'function') {
      console.warn('Social features disabled in Demo Mode.');
      return;
    }
    try { await signInWithPopup(auth, googleProvider); }
    catch (e) { console.error('Sign-in failed:', e); }
  };

  const signOutUser = async () => {
    if (typeof fbSignOut !== 'function') return;
    try { await fbSignOut(auth); }
    catch (e) { console.error('Sign-out failed:', e); }
  };

  return (
    <UserContext.Provider value={{ user, loading, signInWithGoogle, signOut: signOutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
