import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { 
  BookOpen, 
  BookText, 
  Languages, 
  FlaskConical, 
  ChevronRight, 
  Mail, 
  User as UserIcon, 
  Calendar, 
  Flame,
  Trophy,
  TrendingUp
} from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

// Helper function to safely format dates
const safeFormatDate = (timestamp: any): string => {
  if (!timestamp) return 'Recently';
  
  try {
    const date = new Date(timestamp);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Recently';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Recently';
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Function to get activity icon based on type
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'grammar': return <BookOpen className="h-4 w-4 text-purple-500" />;
    case 'vocabulary': return <BookText className="h-4 w-4 text-pink-500" />;
    case 'scripts': return <BookText className="h-4 w-4 text-blue-500" />;
    case 'listening': return <Languages className="h-4 w-4 text-teal-500" />;
    case 'quiz': return <FlaskConical className="h-4 w-4 text-indigo-500" />;
    default: return <BookOpen className="h-4 w-4 text-gray-500" />;
  }
};

const Dashboard = () => {
  const { user, recordActivity } = useUser();
  
  // Create progress data using user's actual progress
  const progressData = useMemo(() => {
    if (!user?.progress) return [];
    
    return [
      { 
        name: 'Hiragana', 
        value: user.progress.hiragana || 0, 
        color: '#4C5E97', 
        path: '/scripts?tab=hiragana', 
        icon: <BookOpen className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Katakana', 
        value: user.progress.katakana || 0, 
        color: '#FF7A93', 
        path: '/scripts?tab=katakana', 
        icon: <BookText className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Kanji', 
        value: user.progress.kanji || 0, 
        color: '#8B5CF6', 
        path: '/scripts?tab=kanji', 
        icon: <BookText className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Grammar', 
        value: user.progress.grammar || 0, 
        color: '#0EA5E9', 
        path: '/grammar', 
        icon: <BookOpen className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Vocabulary', 
        value: user.progress.vocabulary || 0, 
        color: '#F59E0B', 
        path: '/vocabulary', 
        icon: <BookText className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Listening', 
        value: user.progress.listening || 0, 
        color: '#14B8A6', 
        path: '/listening', 
        icon: <Languages className="h-5 w-5 text-white" /> 
      },
      { 
        name: 'Quizzes', 
        value: user.progress.quizzes || 0, 
        color: '#6366F1', 
        path: '/quizzes', 
        icon: <FlaskConical className="h-5 w-5 text-white" /> 
      },
    ];
  }, [user?.progress]);

  // Calculate recommended next steps based on progress
  const recommendedSteps = useMemo(() => {
    if (!user?.progress) return [];
    
    const areas = Object.entries(user.progress)
      .filter(([key]) => key !== 'overall') // Exclude overall progress
      .sort(([, valueA], [, valueB]) => (valueA as number) - (valueB as number))
      .slice(0, 3); // Get the 3 lowest areas
    
    return areas.map(([area, value], index) => {
      let title = '';
      let path = '';
      
      switch (area) {
        case 'hiragana':
          title = 'Practice Hiragana Characters';
          path = '/scripts?tab=hiragana';
          break;
        case 'katakana':
          title = 'Review Katakana Writing';
          path = '/scripts?tab=katakana';
          break;
        case 'kanji':
          title = 'Study Basic Kanji';
          path = '/scripts?tab=kanji';
          break;
        case 'grammar':
          title = 'Learn Grammar Fundamentals';
          path = '/grammar';
          break;
        case 'vocabulary':
          title = 'Expand Your Vocabulary';
          path = '/vocabulary';
          break;
        case 'listening':
          title = 'Improve Listening Skills';
          path = '/listening';
          break;
        case 'reading':
          title = 'Practice Reading Comprehension';
          path = '/reading';
          break;
        case 'quizzes':
          title = 'Take More Practice Quizzes';
          path = '/quizzes';
          break;
        default:
          title = `Improve Your ${area.charAt(0).toUpperCase() + area.slice(1)}`;
          path = `/${area}`;
      }
      
      return {
        id: index + 1,
        title,
        path,
        area,
        progress: value as number
      };
    });
  }, [user?.progress]);
  
  // Handle clicking on "Continue Learning"
  const handleContinueLearning = () => {
    if (recommendedSteps.length > 0) {
      // Record this activity
      recordActivity({
        type: recommendedSteps[0].area as any,
        title: `Started learning ${recommendedSteps[0].area}`
      });
    }
  };

  // Show loading state or prompt sign-in if user data is not available
  if (!user) {
    return (
      <div className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 dark:border-gray-700/30"
        >
          <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Loading your dashboard...</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Please sign in to view your learning progress.</p>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 font-display tracking-tight"
      >
        Your Learning Journey
      </motion.h1>
      
      {/* User Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 glass-card p-6 rounded-xl relative overflow-hidden"
      >
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
        
        <div className="flex items-center">
          <Avatar className="h-16 w-16 ml-6 mr-6 ring-2 ring-indigo-100 dark:ring-indigo-900/30 shadow-md">
            <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <span className="text-xl font-semibold">{user?.name?.charAt(0)?.toUpperCase() || <UserIcon className="h-6 w-6" />}</span>
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{user?.name || 'Learner'}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Mail className="h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                <span>{user?.email || 'No email provided'}</span>
              </p>
              {user?.createdAt && (
                <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-indigo-400 dark:text-indigo-500" />
                  <span>Joined {safeFormatDate(user.createdAt)}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-5 md:mt-0">
          <div className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl shadow-sm border border-amber-100 dark:border-amber-800/30">
            <div className="bg-amber-200 dark:bg-amber-700/50 p-1.5 rounded-lg mr-3">
              <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xl font-semibold text-amber-800 dark:text-amber-300">
                {user.streak?.current || 0}
                <span className="text-sm font-normal text-amber-700 dark:text-amber-400 ml-1">day streak</span>
              </div>
              <p className="text-xs text-amber-700/80 dark:text-amber-500">
                Best: {user.streak?.longest || 0} days
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden h-full">
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                  <Trophy className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </span>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Overall Progress</CardTitle>
              </div>
              <CardDescription>Your JLPT N5 progress summary</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={30}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                      label={false}
                    >
                      {progressData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical" 
                      align="right"
                      verticalAlign="middle"
                      iconSize={10}
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '12px',
                        paddingLeft: '10px',
                      }}
                      formatter={(value) => {
                        const item = progressData.find(data => data.name === value);
                        return (
                          <span className="text-xs font-medium">{value}: {item?.value}%</span>
                        );
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, `${name}`]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                      }}
                      labelStyle={{
                        fontWeight: 'bold',
                        marginBottom: '4px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full mt-4">
                <Progress 
                  value={user.progress?.overall || 0} 
                  className="h-2 bg-indigo-100 [&>div]:bg-gradient-to-r [&>div]:from-indigo-600 [&>div]:to-purple-600"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  {user.progress?.overall || 0}% towards JLPT N5 proficiency
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 lg:col-span-2"
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </span>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Learning Areas</CardTitle>
              </div>
              <CardDescription>Your progress in each study area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 py-4">
                {progressData.map((area, index) => (
                  <motion.div key={area.name} variants={itemVariants} className="flex items-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-sm" style={{ backgroundColor: area.color }}>
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{area.name}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{area.value}%</span>
                      </div>
                      <Progress 
                        value={area.value} 
                        // Style the track using inline style for dynamic color + opacity
                        style={{background: `${area.color}30`}}
                        // Style the indicator using Tailwind arbitrary value targeting the child div
                        className={`h-2.5 rounded-lg [&>div]:bg-[${area.color}]`}
                      />
                    </div>
                    <Button variant="ghost" size="icon" asChild className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                      <Link to={area.path}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
              <Button variant="outline" className="w-full hover:bg-gray-50 dark:hover:bg-gray-800" asChild>
                <Link to="/analytics">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent Activity & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </span>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Activity</CardTitle>
              </div>
              <CardDescription>Your learning history</CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-3">
                {user.recentActivities && user.recentActivities.length > 0 ? (
                  user.recentActivities.slice(0, 5).map((activity) => (
                    <div key={`activity-${activity.id || activity.timestamp}`} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700/30">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded-md mr-2">
                          {getActivityIcon(activity.type)}
                        </div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">{activity.title}</p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {safeFormatDate(activity.timestamp)}
                        </p>
                        {activity.score !== undefined && (
                          <p className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            Score: {activity.score}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-100 dark:border-gray-700/30">
                    <p className="text-gray-500 dark:text-gray-400">No activities yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start learning to see your activities here</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
              <Button variant="outline" className="w-full hover:bg-gray-50 dark:hover:bg-gray-800" asChild>
                <Link to="/analytics">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700/30">
              <div className="flex items-center gap-2">
                <span className="bg-teal-100 dark:bg-teal-900/30 p-1.5 rounded-full">
                  <BookOpen className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </span>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recommended Next Steps</CardTitle>
              </div>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-3">
                {recommendedSteps.length > 0 ? (
                  recommendedSteps.map((step) => (
                    <Link key={`step-${step.id}`} to={step.path}>
                      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 p-4 rounded-lg hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-900/30 dark:hover:to-indigo-900/20 transition-colors cursor-pointer flex items-center justify-between shadow-sm border border-indigo-100 dark:border-indigo-800/30">
                        <div>
                          <p className="font-medium text-indigo-900 dark:text-indigo-300">{step.title}</p>
                          <div className="flex items-center mt-1.5">
                            <div className="w-16 h-1.5 bg-indigo-200 dark:bg-indigo-800/50 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full" 
                                style={{ width: `${step.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 ml-2">
                              {step.progress}%
                            </p>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                          <ChevronRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-100 dark:border-gray-700/30">
                    <p className="text-gray-500">Start learning to get personalized recommendations</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 dark:border-gray-700/30 pt-4">
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all" 
                onClick={handleContinueLearning} 
                asChild
              >
                <Link to={recommendedSteps.length > 0 ? recommendedSteps[0].path : '/grammar'}>
                  Continue Learning
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
