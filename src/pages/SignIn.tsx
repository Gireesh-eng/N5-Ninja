import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { auth, db, googleProvider, githubProvider, resetAuthState, initializeUserData } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

// Define types for better type checking
type AuthError = {
  code?: string;
  message?: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [redirectPath, setRedirectPath] = useState('/');
  const [retryCount, setRetryCount] = useState(0);
  const [showAuthMethodsHelp, setShowAuthMethodsHelp] = useState(false);

  // Check if there's a redirect path stored in sessionStorage when component mounts
  useEffect(() => {
    const storedRedirectPath = sessionStorage.getItem('redirectUrl');
    if (storedRedirectPath && storedRedirectPath !== '/signin') {
      console.log("Found stored redirect path:", storedRedirectPath);
      setRedirectPath(storedRedirectPath);
    } else {
      // Always default to home page if no valid redirect path
      setRedirectPath('/');
    }
  }, []);

  const handleToggleView = () => {
    setIsSignIn(!isSignIn);
    setError('');
    setSuccess('');
    // Reset fields on toggle for better UX
    setEmail('');
    setPassword('');
    setName('');
    setShowPassword(false);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
       setError('Please enter a valid email address.');
       return false;
    }

    if (!isSignIn && !name.trim()) { // Check if name is not just whitespace
      setError('Name is required for sign up.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError(''); // Clear previous errors if validation passes
    return true;
  };

  const performRedirect = (path: string) => {
    console.log("Redirecting to path:", path);
    
    try {
      // Clear any stored redirect path
      sessionStorage.removeItem('redirectUrl');
      
      // Add a small delay for the success message to be visible
      setTimeout(() => {
        navigate(path || '/');
      }, 800);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to direct location change if navigation fails
      window.location.href = path || '/';
    }
  };

  const handleAuthSuccess = (message: string) => {
    console.log("Auth Success:", message);
    setSuccess(message);
    setError('');
    // Clear form fields after success
    setEmail('');
    setPassword('');
    setName('');
    
    // Store the path to redirect to
    const storedPath = redirectPath;
    performRedirect(storedPath);
  };

  const handleAuthError = (err: any) => {
    console.error("Firebase Auth Error:", err);
    // Provide user-friendly error messages
    let message = 'An unknown error occurred. Please try again.';
    
    if (err.code) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'Invalid email or password.';
          break;
        case 'auth/email-already-in-use':
          message = 'This email address is already registered. Please sign in or use a different email.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password is too weak. It must be at least 6 characters.';
          break;
        case 'auth/popup-closed-by-user':
          message = 'Sign-in was cancelled. Please try again and keep the popup open until authentication completes.';
          break;
        case 'auth/cancelled-popup-request':
        case 'auth/popup-blocked':
          message = 'Sign-in popup was blocked by your browser. Please allow popups for this site and try again.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/invalid-credential':
          message = 'Sign-in failed. This email is already associated with a different sign-in method. Please try signing in with Google or GitHub instead.';
          break;
        case 'auth/account-exists-with-different-credential':
          message = 'An account already exists with this email but using a different sign-in method. Please try again with Google or GitHub.';
          break;
        case 'auth/operation-not-allowed':
          message = 'This sign-in method is not enabled. Please contact support.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many unsuccessful login attempts. Please try again later or reset your password.';
          break;
        default:
          // Check for common cross-origin issues in the error message
          if (err.message && (
            err.message.includes("Cross-Origin-Opener-Policy") || 
            err.message.includes("COOP")
          )) {
            message = 'Browser security settings are preventing sign-in. Try using a different browser or disabling tracking protection.';
          } else {
            message = err.message || message;
          }
      }
    }
    
    setError(message);
    setSuccess('');
    setLoading(false);
  };

  // Extracted function to handle invalid credential errors to reduce complexity
  const handleInvalidCredentialError = () => {
    let message = 'Authentication failed. This may be due to invalid or expired credentials.';
    
    // Auto-recovery: clear cached tokens from local/session storage
    try {
      // Clear Firebase auth data from storage
      localStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
      sessionStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
    } catch (e) {
      console.error("Error clearing cached auth data:", e);
    }
    
    // Add troubleshooting steps
    message += '\n\nPlease try these steps:';
    message += '\n1. Clear your browser cookies and cache';
    message += '\n2. Try signing in with a different method';
    message += '\n3. Make sure you\'re entering the correct email and password';
    
    // If this is development mode, provide additional info for developers
    if (import.meta.env.DEV) {
      message += '\n\nDeveloper Info: This error may also indicate an API key issue or Firebase project configuration problem.';
    }
    
    return message;
  };

  const handleResetAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Call the resetAuthState function from firebase.ts
      const result = await resetAuthState();
      
      if (result.success) {
        setSuccess('Authentication state has been reset. Please try signing in again.');
      } else {
        setError('Failed to reset authentication state. Please clear your browser cookies manually.');
      }
    } catch (err) {
      console.error('Error resetting auth state:', err);
      setError('Failed to reset authentication. Please try again or clear your browser cache manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // First clear any potentially conflicting auth state
      await clearAuthState();
      
      if (isSignIn) {
        // Handle sign in
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", user.uid);
        
        // Update last login timestamp
        await setDoc(doc(db, "users", user.uid), {
          lastLogin: serverTimestamp(),
        }, { merge: true });
        
        // Show success message
        setSuccess('Sign in successful!');
        
        // Handle redirect
        const targetPath = redirectPath || '/';
        sessionStorage.removeItem('redirectUrl');
        setTimeout(() => {
          setLoading(false);
          navigate(targetPath);
        }, 500);
      } else {
        // Handle sign up
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log("New user created:", user.uid);
        
        // Initialize user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name.trim(),
          email: user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          progress: {
            hiragana: 0,
            katakana: 0,
            kanji: 0,
          },
        });
        
        // Show success message
        setSuccess('Account created successfully!');
        
        // Handle redirect
        const targetPath = redirectPath || '/';
        sessionStorage.removeItem('redirectUrl');
        setTimeout(() => {
          setLoading(false);
          navigate(targetPath);
        }, 500);
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      handleAuthError(err);
      setLoading(false);
    }
  };

  // Add this new function to clear auth state before sign-in attempts
  const clearAuthState = async () => {
    try {
      // Sign out current user if any
      if (auth.currentUser) {
        await signOut(auth);
      }
      
      // Clear any cached authentication data to prevent conflicts
      localStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
      sessionStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
      
      return true;
    } catch (e) {
      console.error("Error clearing auth state:", e);
      return false;
    }
  };

  // Extracted functions to reduce complexity
  const clearStoredAuthData = () => {
    try {
      localStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
      sessionStorage.removeItem('firebase:authUser:' + import.meta.env.VITE_FIREBASE_API_KEY + ':[DEFAULT]');
    } catch (e) {
      // Ignore errors clearing storage
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await initializeUserData(user.uid, {
          email: user.email,
          lastLogin: serverTimestamp(),
        });
      }
      handleAuthSuccess('Sign in successful!');
      setRetryCount(0); // Reset retry count on success
      
    } catch (initialError: any) {
      // If we get invalid-credential and haven't exceeded retry attempts, try once more
      if (initialError.code === 'auth/invalid-credential' && retryCount < 1) {
        setRetryCount(prev => prev + 1);
        console.log("Retrying authentication after invalid-credential error");
        
        // Small delay before retry
        await new Promise(resolve => setTimeout(resolve, 800));
        await retrySignIn();
      } else {
        throw initialError; // Re-throw for other error types
      }
    }
  };

  const retrySignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await initializeUserData(user.uid, {
        email: user.email,
        lastLogin: serverTimestamp(),
      });
    }
    handleAuthSuccess('Sign in successful!');
    setRetryCount(0); // Reset retry count on success
  };

  const handleSignUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await initializeUserData(user.uid, {
      name: name.trim(),
      email: user.email,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      progress: {
        hiragana: 0,
        katakana: 0,
        kanji: 0,
      },
    });
    handleAuthSuccess('Account created successfully!');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Configure Google provider with proper settings
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline'
      });
      
      // Perform the Google sign-in with retry logic
      let result;
      try {
        result = await signInWithPopup(auth, googleProvider);
      } catch (initialError: any) {
        // If we get invalid-credential and haven't exceeded retry attempts, try once more
        if (initialError.code === 'auth/invalid-credential' && retryCount < 1) {
          setRetryCount(prev => prev + 1);
          console.log("Retrying Google authentication after invalid-credential error");
          
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 800));
          result = await signInWithPopup(auth, googleProvider);
        } else {
          throw initialError;
        }
      }
      
      // Reset retry counter on success
      setRetryCount(0);
      
      const user = result.user;
      console.log("Google sign-in authenticated successfully", user.uid);
      
      // Save the redirect path before any async operations
      const targetPath = redirectPath || '/';
      
      // Clear the redirect path from session storage
      sessionStorage.removeItem('redirectUrl');
      
      // Show success message
      setSuccess('Sign in successful!');
      
      // Update Firestore in the background
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName || 'Unnamed User',
        email: user.email,
        lastLogin: serverTimestamp(),
        progress: {
          hiragana: 0,
          katakana: 0,
          kanji: 0
        },
        createdAt: serverTimestamp()
      }, { merge: true })
        .then(() => console.log("User data updated in Firestore"))
        .catch(err => console.error("Non-critical Firestore error:", err));
      
      // Force navigation immediately
      console.log("Redirecting to:", targetPath);
      setTimeout(() => {
        setLoading(false);
        navigate(targetPath);
      }, 500);
    } catch (err: any) {
      handleAuthError(err);
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Perform the GitHub sign-in with retry logic
      let result;
      try {
        result = await signInWithPopup(auth, githubProvider);
      } catch (initialError: any) {
        // If we get invalid-credential and haven't exceeded retry attempts, try once more
        if (initialError.code === 'auth/invalid-credential' && retryCount < 1) {
          setRetryCount(prev => prev + 1);
          console.log("Retrying GitHub authentication after invalid-credential error");
          
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 800));
          result = await signInWithPopup(auth, githubProvider);
        } else {
          throw initialError;
        }
      }
      
      // Reset retry counter on success
      setRetryCount(0);
      
      const user = result.user;
      console.log("GitHub sign-in authenticated successfully", user.uid);
      
      // Save the redirect path before any async operations
      const targetPath = redirectPath || '/';
      
      // Clear the redirect path from session storage
      sessionStorage.removeItem('redirectUrl');
      
      // Show success message
      setSuccess('Sign in successful!');
      
      // Update Firestore in the background
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName || 'GitHub User',
        email: user.email,
        lastLogin: serverTimestamp(),
        progress: {
          hiragana: 0,
          katakana: 0,
          kanji: 0
        },
        createdAt: serverTimestamp()
      }, { merge: true })
        .then(() => console.log("User data updated in Firestore"))
        .catch(err => console.error("Non-critical Firestore error:", err));
      
      // Force navigation immediately
      console.log("Redirecting to:", targetPath);
      setTimeout(() => {
        setLoading(false);
        navigate(targetPath);
      }, 500);
    } catch (err: any) {
      handleAuthError(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Sign In Container - adjusted width and positioning */}
      <div className="w-full max-w-[1200px] flex overflow-hidden rounded-xl bg-black">
        {/* Left side - Login Form - made narrower */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8">
            <Logo />
          </div>

          <h1 className="text-3xl font-bold text-white mb-6">
            Sign in
          </h1>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-red-50 rounded-md text-sm text-red-700 flex items-start"
            >
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-green-50 rounded-md text-sm text-green-700"
            >
              <span>{success}</span>
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-700 text-white rounded-md py-2 px-4 mb-4 hover:bg-gray-800 transition-all"
          >
            <svg className="h-5 w-5" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 256S109.8 0 244 0c73 0 134.3 29.2 179.8 74.8l-68.8 68.8c-20.3-19-47.5-30.9-78-30.9-65.3 0-118.5 53.6-118.5 119.2s53.1 119.2 118.5 119.2c75.7 0 104.3-55.2 108.7-83.4H244v-80h244z"></path>
            </svg>
            Sign in with Google
          </button>

          {/* GitHub Sign In Button */}
          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-700 text-white rounded-md py-2 px-4 mb-4 hover:bg-gray-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>

          <div className="text-center text-gray-500 my-4">OR</div>

          {/* Email/Password Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="block text-sm text-gray-400">
                  Password
                </label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleEmailSignIn}
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-6 text-center text-gray-400">
            Don't have an account? {' '}
            <a href="#" onClick={handleToggleView} className="text-indigo-400 hover:text-indigo-300">
              Sign Up
            </a>
          </div>
        </div>

        {/* Right side - Image Background - made wider */}
        <div className="hidden md:block md:w-3/5 relative overflow-hidden rounded-r-xl">
          {/* Full-size background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: "url('/image1.png')",
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
            }}
          />
          
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          
          {/* Chat bubble at the bottom */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white/20 backdrop-blur-md rounded-full py-3 px-6 border border-white/30 flex items-center">
              <div className="bg-white rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-white text-sm">Ask N5 Ninja to build your learning path</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;