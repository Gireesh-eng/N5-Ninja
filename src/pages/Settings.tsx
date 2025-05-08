import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, Mail, Moon, Sun, Save, Bell, Globe, BookOpen } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Helper function to handle boolean type constraints - moved outside components to avoid duplication
const handleBooleanChange = (
  setter: React.Dispatch<React.SetStateAction<any>>, 
  state: any, 
  field: string, 
  value: boolean
) => {
  setter({
    ...state,
    [field]: value
  });
};

// Extract ProfileTab component to reduce complexity
const ProfileTab = ({ user, updateUserProfile }) => {
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  
  const handleProfileUpdate = async () => {
    try {
      // Show loading toast for better UX
      const loadingToast = toast({
        title: "Updating profile",
        description: "Saving your profile information...",
        variant: "default",
      });

      await updateUserProfile({
        name: profileForm.name,
        bio: profileForm.bio
      });
      
      // Close loading toast and show success
      loadingToast.dismiss();
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
            <UserIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </span>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Profile Settings</CardTitle>
        </div>
        <CardDescription>
          Manage your personal information and account details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-24 w-24 ring-2 ring-indigo-100 dark:ring-indigo-900/30 shadow-md">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
                {profileForm.name?.charAt(0).toUpperCase() || <UserIcon className="h-10 w-10" />}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300">Display Name</Label>
              <Input 
                id="name" 
                value={profileForm.name} 
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                placeholder="Your display name"
                className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <Input 
                id="email" 
                value={profileForm.email} 
                disabled
                className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 text-gray-500 dark:text-gray-400" 
              />
              <span className="text-xs text-gray-500 mt-1">Email changes require verification. Contact support for help.</span>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bio" className="font-medium text-gray-700 dark:text-gray-300">Bio</Label>
              <Input 
                id="bio" 
                value={profileForm.bio || ''} 
                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                placeholder="A short bio about yourself"
                className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
        <Button 
          onClick={handleProfileUpdate}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Profile Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

// Extract NotificationTab component
const NotificationTab = ({ user, updateUserPreferences }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: user?.preferences?.emailNotifications || false,
    studyReminders: user?.preferences?.studyReminders || false,
    newContentAlerts: user?.preferences?.newContentAlerts || false,
    achievementNotifications: user?.preferences?.achievementNotifications !== false ? true : false,
  });
  
  const handleNotificationUpdate = async () => {
    try {
      // Show loading toast
      const loadingToast = toast({
        title: "Updating notification settings",
        description: "Saving your notification preferences...",
        variant: "default",
      });

      await updateUserPreferences({
        preferences: {
          ...user?.preferences,
          emailNotifications: notificationSettings.emailNotifications,
          studyReminders: notificationSettings.studyReminders,
          newContentAlerts: notificationSettings.newContentAlerts,
          achievementNotifications: notificationSettings.achievementNotifications,
        }
      });
      
      // Dismiss loading toast and show success
      loadingToast.dismiss();
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
        variant: "default", 
      });
    } catch (error) {
      console.error("Failed to update notification settings:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your notification preferences.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </span>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Notification Settings</CardTitle>
        </div>
        <CardDescription>
          Control how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive important updates via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notificationSettings.emailNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, emailNotifications: checked})
              }
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="study-reminders" className="font-medium text-gray-700 dark:text-gray-300">Study Reminders</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get reminders to maintain your study streak
              </p>
            </div>
            <Switch
              id="study-reminders"
              checked={notificationSettings.studyReminders}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, studyReminders: checked})
              }
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="new-content-alerts" className="font-medium text-gray-700 dark:text-gray-300">New Content Alerts</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Be notified when new lessons or features are added
              </p>
            </div>
            <Switch
              id="new-content-alerts"
              checked={notificationSettings.newContentAlerts}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, newContentAlerts: checked})
              }
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="achievement-notifications" className="font-medium text-gray-700 dark:text-gray-300">Achievement Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Celebrate your learning milestones
              </p>
            </div>
            <Switch
              id="achievement-notifications"
              checked={notificationSettings.achievementNotifications}
              onCheckedChange={(checked) => 
                handleBooleanChange(setNotificationSettings, notificationSettings, 'achievementNotifications', checked)
              }
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
        <Button 
          onClick={handleNotificationUpdate}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Notification Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

import { useUISettings } from '@/contexts/UISettingsContext';

// Extract AppSettingsTab component
const AppSettingsTab = ({ user, updateUserPreferences }) => {
  const { theme, setTheme } = useTheme();
  const { showSplashCursor, toggleSplashCursor } = useUISettings(); // Use the UI Settings context
  const [appSettings, setAppSettings] = useState({
    language: user?.preferences?.language || 'english',
    darkMode: theme === 'dark',
    furiganaEnabled: user?.preferences?.furiganaEnabled !== false ? true : false,
    autoPlayAudio: user?.preferences?.autoPlayAudio || false,
  });
  
  const handleAppSettingsUpdate = async () => {
    try {
      // Show loading toast
      const loadingToast = toast({
        title: "Updating app settings",
        description: "Saving your application preferences...",
        variant: "default",
      });

      // Handle theme change
      setTheme(appSettings.darkMode ? 'dark' : 'light');
      
      await updateUserPreferences({
        preferences: {
          ...user?.preferences,
          language: appSettings.language,
          furiganaEnabled: appSettings.furiganaEnabled,
          autoPlayAudio: appSettings.autoPlayAudio,
        }
      });
      
      // Dismiss loading toast and show success
      loadingToast.dismiss();
      toast({
        title: "App settings updated",
        description: "Your app settings have been saved.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update app settings:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your app settings.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
        <div className="flex items-center gap-2">
          <span className="bg-teal-100 dark:bg-teal-900/30 p-1.5 rounded-full">
            <Globe className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          </span>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">App Settings</CardTitle>
        </div>
        <CardDescription>
          Customize your learning experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-5">
          <div className="grid gap-3 p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <Label htmlFor="language" className="font-medium text-gray-700 dark:text-gray-300">Interface Language</Label>
            <Select
              value={appSettings.language}
              onValueChange={(value) => setAppSettings({...appSettings, language: value})}
            >
              <SelectTrigger id="language" className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="h-4 w-4 text-amber-500" />
              <Switch
                id="dark-mode"
                checked={appSettings.darkMode}
                onCheckedChange={(checked) => {
                  // Update app settings state
                  setAppSettings({...appSettings, darkMode: checked});
                  
                  // Actually toggle the theme - use the provided setTheme function
                  setTheme(checked ? 'dark' : 'light');
                  
                  // Force immediate class change on document element to avoid flicker
                  document.documentElement.classList.toggle('dark', checked);
                  
                  // Save to localStorage for persistence
                  localStorage.setItem('theme', checked ? 'dark' : 'light');
                }}
                className="data-[state=checked]:bg-indigo-600"
              />
              <Moon className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="furigana-enabled" className="font-medium text-gray-700 dark:text-gray-300">Show Furigana</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Display reading aids for kanji characters
              </p>
            </div>
            <Switch
              id="furigana-enabled"
              checked={appSettings.furiganaEnabled}
              onCheckedChange={(checked) => 
                handleBooleanChange(setAppSettings, appSettings, 'furiganaEnabled', checked)
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
          
          {/* Splash Cursor Toggle */}
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="splash-cursor" className="font-medium text-gray-700 dark:text-gray-300">Splash Cursor</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable the interactive splash cursor effect
              </p>
            </div>
            <Switch
              id="splash-cursor"
              checked={showSplashCursor}
              onCheckedChange={toggleSplashCursor}
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="auto-play-audio" className="font-medium text-gray-700 dark:text-gray-300">Auto-play Audio</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically play pronunciation when viewing vocabulary
              </p>
            </div>
            <Switch
              id="auto-play-audio"
              checked={appSettings.autoPlayAudio}
              onCheckedChange={(checked) => 
                setAppSettings({...appSettings, autoPlayAudio: checked})
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
        <Button 
          onClick={handleAppSettingsUpdate}
          className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          Save App Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Settings component - now simplified
const Settings = () => {
  const { user, updateUserPreferences, updateUserProfile } = useUser();
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto py-10 px-4 md:px-8"
      >
        <h1 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 font-display tracking-tight">
          Settings
        </h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="app-settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              App Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileTab user={user} updateUserProfile={updateUserProfile} />
            </motion.div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationTab user={user} updateUserPreferences={updateUserPreferences} />
            </motion.div>
          </TabsContent>
          
          {/* App Settings */}
          <TabsContent value="app-settings">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AppSettingsTab user={user} updateUserPreferences={updateUserPreferences} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default Settings;