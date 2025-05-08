import React, { useMemo, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// Verify this import path based on your project structure
import { CalendarHeatmap } from "../components/ui/calendar-heatmap";
import { LineChart, BarChart, PieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { getUserAnalytics } from '@/lib/firebase'; // Import the getUserAnalytics function

const Analytics = () => {
  const { user } = useUser();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch analytics data from Firestore when component mounts
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          console.log('Analytics.tsx: Fetching data for user:', user.uid);
          const data = await getUserAnalytics(user.uid);
          console.log('Analytics.tsx: Raw fetched analyticsData:', data);
          if (data) {
            setAnalyticsData(data);
          }
        } catch (error) {
          console.error('Error fetching analytics data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [user?.uid]);
  
  // Use analyticsData instead of directly referencing user.progress
  const userData = analyticsData || user || {};

  // Progress data for pie chart and progress bars
  const progressData = useMemo(() => {
    if (!userData?.progress) return [];
    // Ensure default values are 0 if properties are missing
    const defaultProgress = {
      hiragana: 0, katakana: 0, kanji: 0, grammar: 0,
      vocabulary: 0, listening: 0, quizzes: 0, overall: 0,
    };
    const userProgress = { ...defaultProgress, ...userData.progress };

    return [
      { name: 'Hiragana', value: userProgress.hiragana, color: '#4C5E97' },
      { name: 'Katakana', value: userProgress.katakana, color: '#FF7A93' },
      { name: 'Kanji', value: userProgress.kanji, color: '#8B5CF6' },
      { name: 'Grammar', value: userProgress.grammar, color: '#0EA5E9' },
      { name: 'Vocabulary', value: userProgress.vocabulary, color: '#F59E0B' },
      { name: 'Listening', value: userProgress.listening, color: '#14B8A6' },
      { name: 'Quizzes', value: userProgress.quizzes, color: '#6366F1' },
    ];
  }, [userData?.progress]);

  // Calculate overall progress safely
  const overallProgress = useMemo(() => userData?.progress?.overall || 0, [userData?.progress]);

  console.log('Analytics.tsx: userData.studyLog before studyTimeData calculation:', userData?.studyLog);

  // Generate study time data for the past 30 days
  const studyTimeData = useMemo(() => {
    const today = new Date();
    // Go back 29 days to get 30 days total including today
    const startDate = subDays(today, 29);
    const days = eachDayOfInterval({ start: startDate, end: today });

    // Fix: Ensure studyLog is always treated as an array
    const studyLogEntries = Array.isArray(userData?.studyLog) ? userData.studyLog : [];
    console.log('Analytics.tsx: studyLogEntries for chart:', studyLogEntries);
    
    // Use YYYY-MM-DD for map keys for consistency with Firestore storage
    const studyLogMap = new Map(
      studyLogEntries.map(log => {
        // Assuming log.date is 'YYYY-MM-DD' from Firestore
        return [log.date, log.minutesStudied];
      })
    );
    console.log('Analytics.tsx: studyLogMap for chart:', studyLogMap);

    const finalChartData = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd'); // Format day to YYYY-MM-DD for lookup
      const actualMinutes = studyLogMap.get(dateStr);

      // Using 0 if no data is more realistic than random mock data here.
      const minutesStudied = actualMinutes !== undefined ? actualMinutes : 0;

      return {
        date: format(day, 'MMM dd'),
        minutes: minutesStudied,
      };
    });
    console.log('Analytics.tsx: Final studyTimeData for chart:', finalChartData);
    return finalChartData;
  }, [userData?.studyLog]);

  // Generate activity data by day of week
  const weekdayData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Shorter names for axis
    const dayData = days.map(day => ({ name: day, activities: 0 }));

    // Fix: Ensure studyLog is always treated as an array
    const studyLogEntries = Array.isArray(userData?.studyLog) ? userData.studyLog : [];
    
    if (studyLogEntries.length > 0) { // Use studyLog for better representation of study sessions
      studyLogEntries.forEach(log => {
        if (log.date && log.activitiesCompleted > 0) { // Count days with actual activity
          try {
            const date = new Date(log.date);
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            if (dayData[dayOfWeek]) {
                 dayData[dayOfWeek].activities += 1; // Count days with study sessions
            }
          } catch (e) {
            console.error("Error parsing date from studyLog:", log.date, e);
          }
        }
      });
    }
    // Fallback or supplement with recentActivities if studyLog is sparse/missing
    else if (userData?.recentActivities && Array.isArray(userData.recentActivities)) {
         userData.recentActivities.forEach(activity => {
             if (activity.timestamp) {
                 try {
                    const date = new Date(activity.timestamp);
                    const dayOfWeek = date.getDay();
                    if (dayData[dayOfWeek]) {
                        dayData[dayOfWeek].activities += 1; // Count individual activities
                    }
                 } catch(e) {
                     console.error("Error parsing date from recentActivities:", activity.timestamp, e);
                 }
            }
         });
     }

    return dayData;
  }, [userData?.recentActivities, userData?.studyLog]);

  // Generate quiz score data using quizHistory from Firestore
  const quizScoreData = useMemo(() => {
    try {
      // First try to use quiz history from Firestore
      if (userData?.quizHistory && Array.isArray(userData.quizHistory) && userData.quizHistory.length > 0) {
        // Filter out any invalid data first
        const validQuizzes = userData.quizHistory.filter(quiz => 
          quiz && typeof quiz.score === 'number' && !isNaN(quiz.score) && quiz.timestamp
        );

        // Sort by timestamp (newest to oldest)
        const sortedQuizzes = [...validQuizzes]
          .sort((a, b) => {
            try {
              const dateA = new Date(a.timestamp);
              const dateB = new Date(b.timestamp);
              return dateB.getTime() - dateA.getTime();
            } catch (e) {
              console.warn("Error sorting quiz dates:", e);
              return 0;
            }
          })
          .slice(0, 10)  // Take only the 10 most recent
          .reverse();    // Reverse to show oldest first on chart (left to right)
          
        // Map to chart data format with proper validation
        return sortedQuizzes.map((quiz, index) => ({
          name: `Quiz ${index + 1}`,
          score: Math.min(100, Math.max(0, Number(quiz.score || 0))), // Ensure score is between 0-100
          category: quiz.quizType || 'General'
        }));
      }
      
      // Fallback to recentActivities if no quiz history in Firestore
      if (userData?.recentActivities && Array.isArray(userData.recentActivities)) {
        const quizActivities = userData.recentActivities.filter(activity =>
          activity && activity.type === 'quiz' && 
          typeof activity.score === 'number' && !isNaN(activity.score)
        );

        // Sort by timestamp if available
        if (quizActivities.length > 0) {
          quizActivities.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              try {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
              } catch (e) {
                return 0;
              }
            }
            return 0;
          });
        }

        const recentQuizzes = quizActivities.slice(0, 10).reverse(); // Get latest 10, then reverse for chart

        return recentQuizzes.map((quiz, index) => ({
          name: `Quiz ${index + 1}`,
          score: Math.min(100, Math.max(0, Number(quiz.score || 0))), // Ensure score is between 0-100
          category: quiz.title?.split(' ')[0] || 'General',
        }));
      }
      
      // Return empty array if no data available
      return [];
    } catch (error) {
      console.error("Error processing quiz score data:", error);
      return []; // Return empty array on error
    }
  }, [userData?.recentActivities, userData?.quizHistory]);

  // Generate learning activity heatmap data
  const heatmapData = useMemo(() => {
    const activityMap = {};
    // Fix: Ensure studyLog is always treated as an array
    const studyLogEntries = Array.isArray(userData?.studyLog) ? userData.studyLog : [];
    
    if (studyLogEntries.length > 0) {
      studyLogEntries.forEach(log => {
        if (log.date) {
          try {
            // Ensure date is formatted correctly (YYYY-MM-DD)
            const dateStr = format(new Date(log.date), 'yyyy-MM-dd');
            activityMap[dateStr] = (activityMap[dateStr] || 0) + (log.activitiesCompleted || 1);
          } catch (e) {
            console.error("Error parsing heatmap date:", log.date, e);
          }
        }
      });
    } else {
      console.warn("No studyLog data found for heatmap. Displaying empty heatmap.");
    }
    return activityMap;
  }, [userData?.studyLog]);

  // Update study time distribution to use real data if available
  const studyTimeDistributionData = useMemo(() => {
    // Try to calculate real distribution based on study logs if they exist
    // Fix: Ensure studyLog is always treated as an array
    const studyLogEntries = Array.isArray(userData?.studyLog) ? userData.studyLog : [];
    const recentActivities = Array.isArray(userData?.recentActivities) ? userData.recentActivities : [];
    
    if (studyLogEntries.length > 0 && recentActivities.length > 0) {
      // Count minutes by category from recent activities
      const minutesByCategory = {};
      recentActivities.forEach(activity => {
        if (activity.type && activity.minutesSpent) {
          const category = activity.type;
          minutesByCategory[category] = (minutesByCategory[category] || 0) + activity.minutesSpent;
        }
      });
      
      // Create data array from minutesByCategory
      if (Object.keys(minutesByCategory).length > 0) {
        const data = Object.entries(minutesByCategory).map(([name, value]) => ({
          name,
          value: value as number
        }));
        
        // Map colors from progressData
        return data.map(item => {
          const progressItem = progressData.find(p => p.name.toLowerCase() === item.name.toLowerCase());
          return {
            ...item,
            color: progressItem ? progressItem.color : '#8884d8' 
          };
        });
      }
    }
    
    // Fall back to hardcoded data if real data isn't available
    const data = [
       { name: 'Hiragana', value: 25 }, 
       { name: 'Katakana', value: 15 },
       { name: 'Kanji', value: 30 },
       { name: 'Grammar', value: 20 },
       { name: 'Vocabulary', value: 35 },
       { name: 'Listening', value: 15 },
       { name: 'Quizzes', value: 10 },
    ];
    
    // Map colors from progressData
    return data.map(item => {
       const progressItem = progressData.find(p => p.name === item.name);
       return {
           ...item,
           color: progressItem ? progressItem.color : '#8884d8' 
       };
    });
  }, [progressData, userData?.studyLog, userData?.recentActivities]);

  // Learning rate data - calculate from actual progress if possible
  const learningRateData = useMemo(() => {
    // Fix: Ensure studyLog is always treated as an array
    const studyLogEntries = Array.isArray(userData?.studyLog) ? userData.studyLog : [];
    
    if (studyLogEntries.length >= 7) {
      // Try to generate weekly learning rate data from studyLog
      const weeks: {[key: string]: number} = {};
      const sortedLogs = [...studyLogEntries].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      // Group by week
      let currentWeek = 1;
      let weekStartDate = new Date(sortedLogs[0].date);
      
      sortedLogs.forEach(log => {
        const logDate = new Date(log.date);
        const diffDays = Math.floor((logDate.getTime() - weekStartDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 7) {
          // Start a new week
          currentWeek++;
          weekStartDate = logDate;
        }
        
        const weekKey = `Wk ${currentWeek}`;
        weeks[weekKey] = (weeks[weekKey] || 0) + (log.activitiesCompleted || 0);
      });
      
      const result = Object.entries(weeks).map(([week, items]) => ({ week, items }));
      
      // Limit to the most recent 6 weeks
      return result.slice(-6);
    }
    
    // Fall back to hardcoded data
    return [
      { week: 'Wk 1', items: 25 },
      { week: 'Wk 2', items: 40 },
      { week: 'Wk 3', items: 30 },
      { week: 'Wk 4', items: 45 },
      { week: 'Wk 5', items: 20 },
      { week: 'Wk 6', items: 35 },
    ];
  }, [userData?.studyLog]);

  if (loading) {
    return (
      <Layout>
        <div className="py-8 px-4 md:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Loading analytics...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="py-8 px-4 md:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view your analytics</h1>
          <p>Please sign in to see your learning statistics and progress data.</p>
          <Button className="mt-4" asChild>
            {/* Assuming you have a signin page route */}
            <a href="/signin">Sign In</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8 px-4 md:px-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-indigo-800 dark:text-indigo-300">Detailed Analytics</h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="habits">Study Habits</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Areas Progress</CardTitle>
                  <CardDescription>Your completion percentage across different study areas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={progressData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          innerRadius={40} // Add inner radius for donut shape
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2} // Add padding between segments for better visualization
                          // Customize label to only show for segments that are large enough
                          label={({ name, percent }) => {
                            // Only show label for segments that are at least 8% of the chart
                            return percent > 0.08 ? `${name}: ${(percent * 100).toFixed(0)}%` : '';
                          }}
                        >
                          {progressData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              stroke="#fff" // Add white stroke for better segment distinction
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value}%`, name]}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '4px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                            padding: '8px'
                          }}
                        />
                        {/* Enhance legend with better positioning and styling */}
                        <Legend 
                          layout="vertical" 
                          align="right" 
                          verticalAlign="middle"
                          wrapperStyle={{
                            paddingLeft: '10px',
                            fontSize: '12px'
                          }}
                          formatter={(value) => {
                            const item = progressData.find(data => data.name === value);
                            return <span className="text-xs font-medium">{value}: {item?.value}%</span>;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Overall progress: {overallProgress}%
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Study Time (Last 14 Days)</CardTitle>
                  <CardDescription>Minutes spent studying each day.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={studyTimeData.slice(-14)} // Show last 14 days
                        margin={{ top: 5, right: 10, left: -10, bottom: 5 }} // Adjust margins
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} unit="m" />
                        <Tooltip
                          labelStyle={{ fontWeight: 'bold', color: '#1F2937' }} 
                          itemStyle={{ color: '#4B5563' }} 
                          formatter={(value, name) => [`${value} minutes`, 'Study Time']}
                          cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} 
                        />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="minutes" name="Study Time" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                 <CardFooter>
                   <p className="text-sm text-muted-foreground">
                     Avg last 30 days: {Math.round(studyTimeData.reduce((sum, day) => sum + (day.minutes as number), 0) / Math.max(1, studyTimeData.length))} min/day
                   </p>
                 </CardFooter>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Study Activity</CardTitle>
                  <CardDescription>Your learning consistency visualized over the past year.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto py-4">
                  {/* Ensure CalendarHeatmap handles potential lack of data gracefully */}
                  <CalendarHeatmap data={heatmapData} />
                </CardContent>
                 <CardFooter className="flex justify-between text-xs text-muted-foreground pt-4">
                    <span>Less</span>
                     {/* Simple legend matching common heatmap colors */}
                    <div className="flex gap-1 items-center">
                       <span className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></span>
                       <span className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></span>
                       <span className="w-3 h-3 bg-green-400 dark:bg-green-700 rounded-sm"></span>
                       <span className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></span>
                       <span className="w-3 h-3 bg-green-800 dark:bg-green-300 rounded-sm"></span>
                     </div>
                    <span>More</span>
                  </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progressData.map((area) => (
                <Card key={area.name}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">{area.name}</CardTitle>
                    {/* Optionally add an icon here */}
                     <span style={{ color: area.color }}>●</span> {/* Simple colored dot */}
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{area.value}%</div>
                      <Progress
                          value={area.value}
                          className="h-2 mt-2"
                          aria-label={`${area.name} progress`}
                          // Use CSS variables for theme-aware coloring if possible, e.g., style={{ '--progress-fill': area.color }}
                          // Or rely on default theme color. Applying background to track:
                          style={{ backgroundColor: `${area.color}30` }} // Light background track using the color
                       />
                  </CardContent>
                </Card>
              ))}
               {/* Overall Progress Card */}
                <Card className="md:col-span-2 lg:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overallProgress}%</div>
                        <Progress value={overallProgress} className="h-2 mt-2" aria-label="Overall progress"/>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>

          {/* Study Habits Tab */}
          <TabsContent value="habits">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity by Day of Week</CardTitle>
                  <CardDescription>Number of days you studied each day of the week.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weekdayData}
                        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} allowDecimals={false} />
                        <Tooltip
                          formatter={(value) => [`${value} study days`, 'Activity']}
                           cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
                           contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
                        />
                        <Bar dataKey="activities" name="Study Days" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consistency Metrics</CardTitle>
                  <CardDescription>Your study streaks and activity counts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
                      {userData.streak?.current ?? 0}
                    </div>
                    <div className="text-lg mt-1 text-muted-foreground">Current Streak (days)</div>

                    <div className="grid grid-cols-3 gap-4 w-full text-center mt-8">
                      <div>
                        <div className="text-2xl font-bold">{userData.streak?.longest ?? 0}</div>
                        <div className="text-sm text-muted-foreground mt-1">Longest Streak</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{userData.activeDays ?? 0}</div>
                        <div className="text-sm text-muted-foreground mt-1">Total Active Days</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{userData.totalActivities ?? 0}</div>
                        <div className="text-sm text-muted-foreground mt-1">Total Activities</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Time Distribution (Example)</CardTitle>
                  <CardDescription>Average time spent per learning area (placeholder data).</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={studyTimeDistributionData} // Use the placeholder data with colors
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value} min`}
                        >
                          {studyTimeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} /> // Use color from the data item
                          ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${value} min (avg)`, name]}
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
                         />
                        <Legend layout="vertical" align="right" verticalAlign="middle"/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                   <CardFooter className="pt-4">
                      <p className="text-xs text-muted-foreground">*Note: This chart currently displays example data.</p>
                    </CardFooter>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quiz Performance</CardTitle>
                  <CardDescription>Scores from your last 10 quizzes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                     {quizScoreData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={quizScoreData}
                          margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
                          <XAxis dataKey="name" fontSize={12} />
                          <YAxis domain={[0, 100]} fontSize={12} unit="%"/>
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Score']}
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                     ) : (
                         <p className="text-center text-muted-foreground h-full flex items-center justify-center">No recent quiz data available.</p>
                     )}
                  </div>
                </CardContent>
                 {quizScoreData.length > 0 && (
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">
                        Average Score (Last {quizScoreData.length}): {Math.round(quizScoreData.reduce((sum, quiz) => sum + quiz.score, 0) / quizScoreData.length)}%
                      </p>
                    </CardFooter>
                  )}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Rate</CardTitle>
                  <CardDescription>Items learned or completed over time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {userData?.studyLog && userData.studyLog.length > 0 ? (
                      <LearningRateChart studyLog={userData.studyLog} recentActivities={userData?.recentActivities} />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-center text-muted-foreground">No learning activity data available yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              {/* Rest of the performance tab content remains unchanged */}
              <Card>
                <CardHeader>
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                  <CardDescription>Areas where you excel or need more practice based on progress.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 border-b pb-2">Strengths (≥ 70%)</h3>
                      <div className="space-y-3 pt-2">
                        {progressData
                          .filter(area => area.value >= 70)
                          .sort((a, b) => b.value - a.value) // Show highest first
                          .map(area => (
                            <div key={area.name} className="flex justify-between items-center text-sm">
                              <span className="font-medium">{area.name}</span>
                              <span className="font-semibold" style={{ color: area.color }}>{area.value}%</span>
                            </div>
                          ))}
                        {progressData.filter(area => area.value >= 70).length === 0 && (
                          <p className="text-sm text-muted-foreground">Keep practicing to develop your strengths!</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 border-b pb-2">Areas for Improvement ({'<'} 50%)</h3>
                      <div className="space-y-3 pt-2">
                        {progressData
                          .filter(area => area.value < 50) // Adjusted threshold
                          .sort((a, b) => a.value - b.value) // Show lowest first
                          .map(area => (
                            <div key={area.name} className="flex justify-between items-center text-sm">
                              <span className="font-medium">{area.name}</span>
                               <span className="font-semibold" style={{ color: area.color }}>{area.value}%</span>
                            </div>
                          ))}
                        {progressData.filter(area => area.value < 50).length === 0 && (
                          <p className="text-sm text-muted-foreground">Great job! Keep up the consistent effort.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                {/* Removed the generic button, recommendations could be integrated above */}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

// Replace the LearningRateChart component with a version that connects to Firestore data
// Define interface for daily activity data
interface DailyActivity {
  date: Date;
  items: number;
}

const LearningRateChart: React.FC<{ studyLog: any; recentActivities: any; }> = ({ studyLog, recentActivities }) => {
  const [chartData, setChartData] = useState<{date: string; items: number}[]>([]);
  
  useEffect(() => {
    const localActivityByDay: {[key: string]: DailyActivity} = {};
    
    const studyLogEntries = Array.isArray(studyLog) ? studyLog : [];
    studyLogEntries.forEach(entry => {
      if (!entry || typeof entry.date !== 'string' || entry.date.trim() === '') {
        // console.warn('LearningRateChart: Skipping studyLog entry due to invalid date:', entry);
        return;
      }
      try {
        const date = new Date(entry.date);
        if (isNaN(date.getTime())) {
          // console.warn('LearningRateChart: Invalid date in studyLog:', entry.date);
          return;
        }
        const dateKey = format(date, 'yyyy-MM-dd');
        
        if (!localActivityByDay[dateKey]) {
          localActivityByDay[dateKey] = { date: date, items: 0 };
        }
        localActivityByDay[dateKey].items += (entry.activitiesCompleted || 0);
      } catch (error) {
        console.error("Error processing study log entry for LearningRateChart:", error, entry);
      }
    });
    
    const recentActivitiesArray = Array.isArray(recentActivities) ? recentActivities : [];
    recentActivitiesArray.forEach(activity => {
      if (!activity || typeof activity.timestamp !== 'string' || activity.timestamp.trim() === '') {
        // console.warn('LearningRateChart: Skipping recent activity due to invalid or missing timestamp:', activity);
        return; 
      }
      try {
        const date = new Date(activity.timestamp); 
        if (isNaN(date.getTime())) {
          // console.warn('LearningRateChart: Created an invalid date from recentActivity timestamp:', activity.timestamp, '; Skipping this entry.');
          return;
        }
        const dateKey = format(date, 'yyyy-MM-dd');
        
        if (!localActivityByDay[dateKey]) {
          localActivityByDay[dateKey] = { date: date, items: 0 };
        }
        localActivityByDay[dateKey].items += 1; 
      } catch (error) {
        console.error("Error processing recent activity for LearningRateChart:", error, activity);
      }
    });
    
    const activityArray = Object.values(localActivityByDay);
    activityArray.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    
    const formattedData = activityArray.map(day => ({
      date: format(day.date, 'MMM dd'),
      items: day.items
    }));
    
    setChartData(formattedData);
  }, [studyLog, recentActivities]);
  
  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No learning data available yet for rate chart.</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="date" fontSize={12} />
        <YAxis fontSize={12} allowDecimals={false} />
        <Tooltip
          formatter={(value) => [`${value} items`, 'Learned']}
          cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
        />
        <Bar 
          dataKey="items" 
          name="Items Learned" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Analytics;