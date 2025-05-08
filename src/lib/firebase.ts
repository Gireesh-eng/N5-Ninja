// lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  GoogleAuthProvider,
  GithubAuthProvider, 
  connectAuthEmulator, 
  browserLocalPersistence,
  indexedDBLocalPersistence, 
  setPersistence,
  inMemoryPersistence,
  signInWithCredential,
  signOut,
  onIdTokenChanged
} from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
// Optional: Import other Firebase services like Analytics
// import { getAnalytics, Analytics } from "firebase/analytics";

// Validate Firebase config before initializing
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional
};

// Validate Firebase config has necessary fields
const validateFirebaseConfig = (config: any) => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error(`Missing required Firebase config fields: ${missingFields.join(', ')}`);
    console.error('Check your environment variables or .env file');
    return false;
  }
  
  return true;
}

if (!validateFirebaseConfig(firebaseConfig)) {
  throw new Error('Invalid Firebase configuration. See console for details.');
}

// --- Initialize Firebase ---
// Check if Firebase has already been initialized to prevent errors during hot-reloads in development.
let app: FirebaseApp;
if (!getApps().length) { // Check if any apps are initialized
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized with project:', firebaseConfig.projectId);
} else {
    app = getApp(); // Get the existing app instance
    // console.log('Firebase already initialized'); // Optional: Keep or remove this log
}

// Initialize and export Firebase services
const auth: Auth = getAuth(app);

// Configure auth persistence - use indexedDB for better persistence
// Changed from sessionPersistence to improve login stability
const persistenceMode = typeof window !== 'undefined' 
  ? indexedDBLocalPersistence 
  : inMemoryPersistence;

setPersistence(auth, persistenceMode)
  .then(() => console.log('Auth persistence set successfully'))
  .catch((error) => {
    console.error("Auth persistence error:", error);
    // Fallback to browserLocalPersistence if indexedDB fails
    setPersistence(auth, browserLocalPersistence)
      .catch(e => console.error("Fallback persistence error:", e));
  });

// Connect to emulators if in development environment
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    console.log('Connected to Auth emulator');
  } catch (e) {
    console.error('Failed to connect to Auth emulator', e);
  }
}

const db: Firestore = getFirestore(app);

// Connect to Firestore emulator in development
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
  } catch (e) {
    console.error('Failed to connect to Firestore emulator', e);
  }
}

const storage = getStorage(app);

// Connect to Storage emulator in development
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Storage emulator');
  } catch (e) {
    console.error('Failed to connect to Storage emulator', e);
  }
}

// Initialize Google Auth Provider (OAuth 2.0 specific for Google)
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
// Configure Google provider with proper scopes and parameters
googleProvider.addScope('profile');
googleProvider.addScope('email');
// Set custom parameters for better UX and stability
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Include access_type parameter to request refresh token
  access_type: 'offline'
});

// Initialize GitHub Auth Provider
const githubProvider: GithubAuthProvider = new GithubAuthProvider();
// Configure GitHub provider with proper scopes
githubProvider.addScope('user');
githubProvider.addScope('email');

// Auto token refresh mechanism to prevent credentials from becoming invalid
onIdTokenChanged(auth, async (user) => {
  if (user) {
    try {
      // Force refresh token if it's close to expiration
      const tokenResult = await user.getIdTokenResult();
      const expirationTime = new Date(tokenResult.expirationTime).getTime();
      const now = Date.now();
      
      // If token is going to expire within 10 minutes, refresh it
      if (expirationTime - now < 10 * 60 * 1000) {
        await user.getIdToken(true);  // Force refresh the token
        console.log('Auth token refreshed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }
  }
});

// Track user study progress and analytics
export const trackStudySession = async (userId: string, data: {
  category: string; // e.g., 'hiragana', 'katakana', 'kanji', etc.
  minutesStudied: number;
  activitiesCompleted: number;
  score?: number; // Optional score for quiz activities
  itemsLearned?: number; // Optional count of new items learned
}) => {
  if (!userId) {
    console.error('Cannot track study session: No user ID provided');
    return;
  }

  try {
    const userRef = doc(db, 'users', userId);
    const studyDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Get current user data
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.error('User document not found');
      return;
    }
    
    const userData = userDoc.data();
    
    // Ensure studyLog is an array
    let studyLog = [];
    if (userData.studyLog && Array.isArray(userData.studyLog)) {
      studyLog = userData.studyLog;
    } else if (userData.studyLog) {
      // If studyLog exists but is not an array, log an error and default to empty.
      // This prevents a crash and allows the system to self-correct for this user over time.
      console.warn(`User ${userId} has a studyLog that is not an array. Resetting for this session.`, userData.studyLog);
      // Optionally, you could try to convert it or handle specific non-array cases here.
    }
    // If userData.studyLog was undefined, it remains an empty array as initialized.

    const todayLogIndex = studyLog.findIndex(log => log.date === studyDate);
    
    if (todayLogIndex >= 0) {
      // Update existing log for today
      studyLog[todayLogIndex].minutesStudied += data.minutesStudied;
      studyLog[todayLogIndex].activitiesCompleted += data.activitiesCompleted;
    } else {
      // Create new log for today
      studyLog.push({
        date: studyDate,
        minutesStudied: data.minutesStudied,
        activitiesCompleted: data.activitiesCompleted
      });
    }
    
    // Limit log size to prevent document size issues
    const limitedStudyLog = studyLog.slice(-90); // Keep last 90 days
    
    // Track recent activity
    const activity = {
      type: data.category,
      timestamp: new Date().toISOString(),
      minutesSpent: data.minutesStudied,
      score: data.score !== undefined ? data.score : undefined
    };

    const recentActivities = [
      activity,
      ...(userData.recentActivities || []).slice(0, 19) // Keep last 20 activities
    ];
    
    // Calculate streak
    let streak = userData.streak || { current: 0, longest: 0, lastStudyDate: null };
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateStr = yesterday.toISOString().split('T')[0];
    
    if (streak.lastStudyDate === yesterdayDateStr) {
      // Continued the streak
      streak.current++;
      streak.longest = Math.max(streak.longest, streak.current);
    } else if (streak.lastStudyDate !== studyDate) {
      // Broke the streak (not yesterday and not already logged today)
      streak.current = 1;
    }
    streak.lastStudyDate = studyDate;
    
    // Update progress for specific category
    const progress = userData.progress || {
      hiragana: 0,
      katakana: 0,
      kanji: 0,
      grammar: 0,
      vocabulary: 0,
      listening: 0,
      quizzes: 0,
      overall: 0
    };
    
    // Only update progress if the activity is a quiz with score
    if (data.score !== undefined && data.category in progress) {
      // Gradually increase progress, weighted by current score
      const currentProgress = progress[data.category];
      const scoreWeight = data.score / 100; // Convert score to decimal (0-1)
      const progressIncrement = Math.min(5, 3 * scoreWeight); // Max 5% increase per activity
      
      progress[data.category] = Math.min(100, currentProgress + progressIncrement);
      
      // Recalculate overall progress
      const categories = Object.keys(progress).filter(key => key !== 'overall');
      const sum = categories.reduce((acc, category) => acc + progress[category], 0);
      progress.overall = Math.round(sum / categories.length);
    }
    
    // Update active days count
    const activeDays = userData.activeDays || 0;
    const isNewActiveDay = todayLogIndex < 0;
    
    // Update Firestore with all the changes
    await setDoc(userRef, {
      studyLog: limitedStudyLog,
      recentActivities,
      streak,
      progress,
      activeDays: isNewActiveDay ? activeDays + 1 : activeDays,
      totalActivities: (userData.totalActivities || 0) + data.activitiesCompleted,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    
    console.log(`Study session tracked for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error tracking study session:', error);
    return false;
  }
};

// Track quiz completion specifically
export const trackQuizCompletion = async (userId: string, data: {
  quizType: string; // e.g., 'hiragana', 'katakana', 'vocabulary'
  score: number; // 0-100
  timeSpentMinutes: number;
  totalQuestions: number;
  correctAnswers: number;
}) => {
  if (!userId) {
    console.error('Cannot track quiz completion: No user ID provided');
    return;
  }

  try {
    // Call trackStudySession to update overall study log and streak
    await trackStudySession(userId, {
      category: data.quizType, // Use quizType as category
      minutesStudied: data.timeSpentMinutes,
      activitiesCompleted: 1, // Each quiz completion is one activity
      score: data.score // Pass score to study session
    });

    // Then add specific quiz details
    const userRef = doc(db, 'users', userId);
    const quizHistoryRef = doc(collection(userRef, 'quizHistory'));
    
    await setDoc(quizHistoryRef, {
      quizType: data.quizType,
      score: data.score,
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
      timeSpentMinutes: data.timeSpentMinutes,
      timestamp: new Date().toISOString()
    });
    
    console.log(`Quiz completion tracked for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error tracking quiz completion:', error);
    return false;
  }
};

// Function to get user analytics data
export const getUserAnalytics = async (userId: string) => {
  if (!userId) return null;
  
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.warn(`No user document found for ${userId}`);
      return null;
    }
    
    // Get quiz history if needed
    const quizHistoryQuery = await getDocs(collection(userRef, 'quizHistory'));
    const quizHistory = quizHistoryQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return {
      ...userDoc.data(),
      quizHistory
    };
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    return null;
  }
};

// Handle auth state changes - useful for debugging
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in', user.uid);
  } else {
    console.log('User is signed out');
  }
});

// Function to check auth status - can be used to verify token validity
export const checkAuthStatus = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Force token refresh if it might be expired
      await currentUser.getIdToken(true);
      return { isAuthenticated: true, user: currentUser };
    }
    return { isAuthenticated: false, user: null };
  } catch (error) {
    console.error("Auth status check failed:", error);
    return { isAuthenticated: false, user: null, error };
  }
};

// Function to reset auth state - useful when encountering credential errors
export const resetAuthState = async () => {
  try {
    // Clear any stored tokens
    localStorage.removeItem('firebase:authUser:' + firebaseConfig.apiKey + ':[DEFAULT]');
    sessionStorage.removeItem('firebase:authUser:' + firebaseConfig.apiKey + ':[DEFAULT]');
    
    // Sign out to completely reset auth state
    if (auth.currentUser) {
      await signOut(auth);
    }
    
    return { success: true, message: "Auth state reset successfully" };
  } catch (error) {
    console.error("Auth state reset failed:", error);
    return { success: false, error };
  }
};

// Function to initialize user data in Firestore
export const initializeUserData = async (userId, userData) => {
  try {
    console.log(`Initializing user data for UID: ${userId}`);
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log('User document does not exist. Creating new document.');
      await setDoc(userDocRef, userData);
      console.log('User data initialized in Firestore');
    } else {
      console.log('User data already exists in Firestore');
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
};

export { app, auth, db, googleProvider, githubProvider, storage };