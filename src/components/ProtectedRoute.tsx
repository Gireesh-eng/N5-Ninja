import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Check for local token immediately to avoid unnecessary wait
  const hasLocalAuth = !!localStorage.getItem('auth_token');

  useEffect(() => {
    // If we already have a token in localStorage, we can skip waiting for Firebase
    // This provides an immediate auth decision and prevents unnecessary loading states
    if (hasLocalAuth) {
      setAuthChecked(true);
      setShowLoading(false);
      return; // Skip the rest of the effect if we have local auth
    }

    // If authentication check is complete from Firebase
    if (!loading) {
      setAuthChecked(true);
      
      // If not authenticated and no local token, redirect to sign-in
      if (!user && !hasLocalAuth) {
        // Save the current location so we can redirect back after signing in
        if (location.pathname !== '/signin') {
          sessionStorage.setItem('redirectUrl', location.pathname);
        }
        // Redirect to the sign-in page
        navigate('/signin');
      }
    }

    // Only show loading spinner after a short delay (reduced from 300ms to 200ms)
    let timer: number | undefined;
    if (loading && !hasLocalAuth) {
      timer = window.setTimeout(() => {
        setShowLoading(true);
      }, 200); 
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [user, loading, navigate, location.pathname, hasLocalAuth]);

  // Don't show loading spinner immediately - only if auth check takes too long
  // and we don't have a local token
  if (loading && showLoading && !hasLocalAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  // If we have local auth OR firebase user, render the protected content right away
  if (hasLocalAuth || user) {
    return <>{children}</>;
  }

  // If still loading but haven't hit the delay threshold, show nothing yet
  if (loading && !authChecked) {
    return null;
  }

  // Default fallback - should rarely get here
  return null;
};

export default ProtectedRoute;