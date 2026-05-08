import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, db, storage;
const googleProvider = new GoogleAuthProvider();

try {
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    // Mock for demo mode
    console.warn('Firebase API key missing. Wandr is running in Demo Mode.');
    app = { name: 'mock-app' };
    auth = { onAuthStateChanged: (cb) => { cb(null); return () => {}; } };
    db = {};
    storage = {};
  }
} catch (e) {
  console.error('Firebase initialization failed:', e);
}

export { auth, googleProvider, db, storage };
export default app;
