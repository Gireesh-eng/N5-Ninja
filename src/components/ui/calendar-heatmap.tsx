import React from 'react';
import { cn } from '@/lib/utils';

interface CalendarHeatmapProps {
  data: Record<string, number>;
  className?: string;
}

export const CalendarHeatmap = ({
  data,
  className,
}: CalendarHeatmapProps) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  // Generate an array of months (current month and 11 previous months)
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(year, month - 11 + i, 1);
    return {
      name: d.toLocaleString('default', { month: 'short' }),
      year: d.getFullYear(),
      month: d.getMonth(),
      weeks: getWeeksForMonth(d.getFullYear(), d.getMonth())
    };
  });

  function getWeeksForMonth(year: number, month: number) {
    const weeks: Date[][] = [[]];
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    
    // Fill first week with empty days until the first day of month
    const firstDay = firstDate.getDay();
    for (let i = 0; i < firstDay; i++) {
      weeks[0].push(null);
    }
    
    // Fill the days of the month
    for (let day = 1; day <= lastDate.getDate(); day++) {
      const date = new Date(year, month, day);
      const weekIndex = Math.floor((firstDay + day - 1) / 7);
      
      if (!weeks[weekIndex]) {
        weeks[weekIndex] = [];
      }
      
      weeks[weekIndex].push(date);
    }
    
    // Fill the last week with empty days
    const lastWeek = weeks[weeks.length - 1];
    if (lastWeek.length < 7) {
      for (let i = lastWeek.length; i < 7; i++) {
        lastWeek.push(null);
      }
    }
    
    return weeks;
  }

  function getActivityLevel(date: Date): number {
    if (!date) return 0;
    
    const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const activityCount = data[dateStr] || 0;
    
    if (activityCount === 0) return 0;
    if (activityCount === 1) return 1;
    if (activityCount <= 2) return 2;
    if (activityCount <= 4) return 3;
    return 4;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-max">
        <div className="flex justify-end mb-2 gap-1 text-sm text-gray-500">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="w-6 h-6 flex items-center justify-center">
              {day[0]}
            </div>
          ))}
        </div>
        
        <div className="flex gap-1">
          {months.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex flex-col">
              <div className="h-6 text-xs text-gray-500 flex items-center justify-center mb-1">
                {monthData.name}
              </div>
              
              <div className="flex gap-1">
                <div className="grid grid-cols-1 gap-1">
                  {monthData.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex gap-1">
                      {week.map((date, dayIndex) => {
                        const level = date ? getActivityLevel(date) : 0;
                        const isToday = date && 
                          date.getDate() === today.getDate() && 
                          date.getMonth() === today.getMonth() && 
                          date.getFullYear() === today.getFullYear();
                        
                        return (
                          <div
                            key={dayIndex}
                            className={cn(
                              "w-6 h-6 rounded-sm",
                              date ? "cursor-pointer" : "opacity-0",
                              isToday && "ring-2 ring-offset-1 ring-indigo-500",
                              level === 0 && date && "bg-gray-100 dark:bg-gray-800",
                              level === 1 && "bg-green-100 dark:bg-green-900",
                              level === 2 && "bg-green-300 dark:bg-green-700",
                              level === 3 && "bg-green-500 dark:bg-green-500",
                              level === 4 && "bg-green-700 dark:bg-green-300"
                            )}
                            title={date ? 
                              `${date.toLocaleDateString()}: ${data[date.toISOString().split('T')[0]] || 0} activities` : 
                              ''}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};