import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase if not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

// Activity type for tracking user learning activities
interface LearningActivity {
  id: string;
  type: 'grammar' | 'vocabulary' | 'scripts' | 'listening' | 'reading' | 'quiz';
  title: string;
  timestamp: Date;
  score?: number;
  details?: object;
}

// Study log entry for tracking daily activity
interface StudyLogEntry {
  date: string;
  minutesStudied: number;
  activitiesCompleted: number;
}

// User preferences interface
interface UserPreferences {
  language?: string;
  emailNotifications?: boolean;
  studyReminders?: boolean;
  newContentAlerts?: boolean;
  achievementNotifications?: boolean;
  furiganaEnabled?: boolean;
  autoPlayAudio?: boolean;
  // Remove nested notifications object as we're using flat structure
}

// User type definition with enhanced progress tracking
interface UserData {
  uid: string;
  email: string | null;
  name: string | null;
  // avatarUrl?: string | null; // Removed avatarUrl
  bio?: string;
  createdAt?: Date;
  lastLogin?: Date;
  progress?: {
    hiragana: number;
    katakana: number;
    kanji: number;
    grammar: number;
    vocabulary: number;
    listening: number;
    reading: number;
    quizzes: number;
    overall: number;
  };
  learnedCharacters?: {
    hiragana: string[];
    katakana: string[];
    kanji: string[];
  };
  recentActivities?: LearningActivity[];
  studyLog?: StudyLogEntry[];
  activeDays?: number;
  totalActivities?: number;
  streak?: {
    current: number;
    longest: number;
    lastActivity: Date | null;
  };
  preferences?: UserPreferences;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserProgress: (area: string, value: number) => Promise<void>;
  recordActivity: (activity: Omit<LearningActivity, 'id' | 'timestamp'>) => Promise<void>;
  updateUserProfile: (profileData: Partial<UserData>) => Promise<void>;
  updateUserPreferences: (preferences: Partial<{ preferences: UserPreferences } & Pick<UserData, 'name' | 'bio'>>) => Promise<void>; // Removed avatarUrl from Pick
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  updateUserProgress: async () => {},
  recordActivity: async () => {},
  updateUserProfile: async () => {},
  updateUserPreferences: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate the overall progress from all learning areas
  const calculateOverallProgress = (progress: UserData['progress']) => {
    if (!progress) return 0;
    
    const values = Object.values(progress).filter(val => typeof val === 'number');
    if (values.length === 0) return 0;
    
    // Exclude the overall property itself from calculation
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / values.length);
  };

  // Update user streak based on activity - moved INSIDE the component
  const updateUserStreak = async (userRef: any, currentStreak: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let streak = currentStreak || { current: 0, longest: 0, lastActivity: null };
    const lastActivity = streak.lastActivity?.toDate ? streak.lastActivity.toDate() : streak.lastActivity;
    
    if (!lastActivity) {
      // First time user logs in
      streak = { current: 1, longest: 1, lastActivity: serverTimestamp() };
    } else {
      const lastDate = new Date(lastActivity);
      lastDate.setHours(0, 0, 0, 0);
      
      if (lastDate.getTime() === today.getTime()) {
        // Already logged in today, no streak update
      } else if (lastDate.getTime() === yesterday.getTime()) {
        // Consecutive day login
        streak.current += 1;
        streak.longest = Math.max(streak.longest, streak.current);
        streak.lastActivity = serverTimestamp();
      } else {
        // Streak broken
        streak = { current: 1, longest: Math.max(streak.longest || 0, 1), lastActivity: serverTimestamp() };
      }
    }
    
    // Update streak in database
    await updateDoc(userRef, { streak });
    
    return streak;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in - store authentication token in localStorage
        localStorage.setItem('auth_token', await firebaseUser.getIdToken());
        
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userRef);
          // const photoURL = firebaseUser.photoURL; // Removed photoURL fetching
          
          const now = new Date();
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const progress = userData.progress || {
              hiragana: 0,
              katakana: 0,
              kanji: 0,
              grammar: 0,
              vocabulary: 0,
              listening: 0, 
              reading: 0,
              quizzes: 0
            };
            
            // Add overall progress if it doesn't exist
            if (!progress.overall) {
              progress.overall = calculateOverallProgress(progress);
            }
            
            // Update last login time
            await updateDoc(userRef, {
              lastLogin: serverTimestamp()
            });
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name || firebaseUser.displayName,
              // avatarUrl: photoURL, // Removed avatarUrl
              createdAt: userData.createdAt?.toDate() || now,
              lastLogin: now,
              progress: progress,
              learnedCharacters: userData.learnedCharacters || {
                hiragana: [],
                katakana: [],
                kanji: []
              },
              recentActivities: userData.recentActivities || [],
              streak: userData.streak || { current: 0, longest: 0, lastActivity: null },
              bio: userData.bio || '',
              studyLog: userData.studyLog || [],
              activeDays: userData.activeDays || 0,
              totalActivities: userData.totalActivities || 0,
              preferences: userData.preferences || {}
            });
            
            // Update streak if needed
            updateUserStreak(userRef, userData.streak);
            
          } else {
            // Create new user document if it doesn't exist
            const defaultProgress = {
              hiragana: 0,
              katakana: 0,
              kanji: 0,
              grammar: 0,
              vocabulary: 0,
              listening: 0,
              reading: 0,
              quizzes: 0,
              overall: 0
            };
            
            const newUserData = {
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              // avatarUrl: photoURL, // Removed avatarUrl
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
              progress: defaultProgress,
              recentActivities: [],
              streak: { current: 0, longest: 0, lastActivity: null },
              bio: '',
              studyLog: [],
              activeDays: 0,
              totalActivities: 0,
              preferences: {}
            };
            
            await setDoc(userRef, newUserData);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              // avatarUrl: photoURL, // Removed avatarUrl
              createdAt: now,
              lastLogin: now,
              progress: defaultProgress,
              recentActivities: [],
              streak: { current: 0, longest: 0, lastActivity: null },
              bio: '',
              studyLog: [],
              activeDays: 0,
              totalActivities: 0,
              preferences: {}
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Set basic user data even if Firestore fetch fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            // avatarUrl: firebaseUser.photoURL, // Removed avatarUrl
            progress: { 
              hiragana: 0, 
              katakana: 0, 
              kanji: 0,
              grammar: 0,
              vocabulary: 0,
              listening: 0,
              reading: 0,
              quizzes: 0,
              overall: 0
            },
            bio: '',
            studyLog: [],
            activeDays: 0,
            totalActivities: 0,
            preferences: {}
          });
        }
      } else {
        // User is signed out - remove authentication token
        localStorage.removeItem('auth_token');
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Define the logout function
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('auth_token'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Update user progress for any learning area
  const updateUserProgress = async (area: string, value: number) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      
      // Create updated progress object
      const updatedProgress = {
        ...user.progress,
        [area]: value
      };
      
      // Calculate overall progress
      updatedProgress.overall = calculateOverallProgress(updatedProgress);
      
      // Update Firestore
      await updateDoc(userRef, {
        progress: updatedProgress,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          progress: updatedProgress
        };
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Record a learning activity
  const recordActivity = async (activity: Omit<LearningActivity, 'id' | 'timestamp'>) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, "users", user.uid);
      
      // Create activity with ID and timestamp
      const newActivity = {
        ...activity,
        id: crypto.randomUUID(),
        timestamp: new Date()
      };
      
      console.log("Recording activity in Firestore:", {
        userId: user.uid,
        activity: newActivity,
      });
      
      // Get today's date in YYYY-MM-DD format for the study log
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      // Update user document
      await updateDoc(userRef, {
        recentActivities: arrayUnion(newActivity),
        updatedAt: serverTimestamp(),
        totalActivities: (user.totalActivities || 0) + 1,
        // This is a simplified approach - in production you'd use a transaction
        // to properly update the studyLog array
        [`studyLog.${dateString}`]: {
          date: dateString,
          minutesStudied: ((user.studyLog || []).find(log => log.date === dateString)?.minutesStudied || 0) + 5,
          activitiesCompleted: ((user.studyLog || []).find(log => log.date === dateString)?.activitiesCompleted || 0) + 1
        },
        // Count unique days in study log as activeDays
        activeDays: [...new Set([...(user.studyLog || []).map(log => log.date), dateString])].length
      });
      
      console.log("Activity recorded successfully in Firestore");
      
      // Update local state
      setUser(prev => {
        if (!prev) return null;
        
        // Add to front of array and limit to 20 activities
        const updatedActivities = [newActivity, ...(prev.recentActivities || [])].slice(0, 20);
        
        // Update study log
        const existingLog = (prev.studyLog || []).find(log => log.date === dateString);
        let updatedStudyLog = [...(prev.studyLog || [])];
        
        if (existingLog) {
          // Update existing log entry
          updatedStudyLog = updatedStudyLog.map(log => 
            log.date === dateString 
              ? {
                  ...log,
                  minutesStudied: log.minutesStudied + 5,
                  activitiesCompleted: log.activitiesCompleted + 1
                }
              : log
          );
        } else {
          // Add new log entry
          updatedStudyLog.push({
            date: dateString,
            minutesStudied: 5,
            activitiesCompleted: 1
          });
        }
        
        // Count unique active days
        const activeDays = new Set(updatedStudyLog.map(log => log.date)).size;
        
        return {
          ...prev,
          recentActivities: updatedActivities,
          studyLog: updatedStudyLog,
          totalActivities: (prev.totalActivities || 0) + 1,
          activeDays
        };
      });
      
      // Also update streak
      await updateUserStreak(userRef, user.streak);
      
    } catch (error) {
      console.error("Error recording activity:", {
        userId: user.uid,
        error,
      });
    }
  };

  // Update user profile information
  const updateUserProfile = async (profileData: Partial<UserData>) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, "users", user.uid);
      
      // Remove properties that shouldn't be directly updated
      const { uid, email, ...updatableData } = profileData;
      
      // Update Firestore
      await updateDoc(userRef, {
        ...updatableData,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...updatableData
        };
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // Example of properly merging nested preference objects
  const updateUserPreferences = async (data: Partial<{ preferences: UserPreferences } & Pick<UserData, 'name' | 'bio'>>) => { // Removed avatarUrl from Pick
    if (!user) return;
    
    try {
      const userRef = doc(db, "users", user.uid);
      
      // If updating preferences, merge with existing preferences
      let updateData: any = { ...data };
      
      if (data.preferences) {
        // Create a deep merged object of preferences to avoid overwriting unrelated preferences
        updateData.preferences = {
          ...(user.preferences || {}),  // Start with all existing preferences
          ...data.preferences          // Override with new preferences
        };
        
        // Remove handling of nested notifications object since we're using flat structure
        // The above merge will correctly handle all notification settings
      }
      
      // Update Firestore with merge: true to ensure we don't overwrite unrelated fields
      await updateDoc(userRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUser(prev => {
        if (!prev) return null;
        
        const updatedUser: UserData = { ...prev };
        
        // Update direct properties
        if (data.name) updatedUser.name = data.name;
        if (data.bio) updatedUser.bio = data.bio;
        // if (data.avatarUrl) updatedUser.avatarUrl = data.avatarUrl; // Removed avatarUrl update
        
        // Update preferences
        if (data.preferences) {
          updatedUser.preferences = {
            ...(updatedUser.preferences || {}),
            ...data.preferences
          };
          
          // Remove handling of nested notifications object
        }
        
        return updatedUser;
      });
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      updateUserProgress,
      recordActivity,
      updateUserProfile,
      updateUserPreferences
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);