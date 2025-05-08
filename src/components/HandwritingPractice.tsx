import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eraser, Save, RotateCcw, Check, Volume2, HelpCircle, Star, Info, ArrowLeft, ArrowRight, BookOpen, Brush } from 'lucide-react';

interface Point { x: number; y: number; }
interface Stroke { points: Point[]; }

// Stroke patterns for various characters with more accurate Japanese style
const strokePatterns: Record<string, Stroke[]> = {
  'あ': [
    // First stroke - curved line from top-middle down-right
    { 
      points: [
        { x: 150, y: 60 }, 
        { x: 180, y: 100 },
        { x: 210, y: 150 }, 
        { x: 215, y: 200 },
        { x: 190, y: 230 }
      ] 
    },
    // Second stroke - horizontal line from left to right
    { 
      points: [
        { x: 90, y: 140 }, 
        { x: 140, y: 140 }, 
        { x: 200, y: 140 }
      ] 
    },
    // Third stroke - curved loop from bottom-left, looping back
    { 
      points: [
        { x: 100, y: 190 },
        { x: 130, y: 220 },
        { x: 170, y: 230 },
        { x: 200, y: 210 },
        { x: 190, y: 180 },
        { x: 150, y: 160 },
        { x: 110, y: 170 }
      ] 
    }
  ],
  'い': [
    // First stroke - vertical line slightly sloping
    { 
      points: [
        { x: 150, y: 70 },
        { x: 140, y: 120 },
        { x: 130, y: 170 },
        { x: 120, y: 220 }
      ] 
    },
    // Second stroke - horizontal with slight curve
    { 
      points: [
        { x: 180, y: 170 },
        { x: 150, y: 185 },
        { x: 120, y: 200 },
        { x: 90, y: 215 }
      ] 
    }
  ],
  'う': [
    // First stroke - curved line
    { 
      points: [
        { x: 130, y: 90 },
        { x: 150, y: 120 },
        { x: 170, y: 150 },
        { x: 180, y: 180 },
        { x: 160, y: 210 }
      ] 
    },
    // Second stroke - short horizontal line with hook
    { 
      points: [
        { x: 100, y: 170 },
        { x: 130, y: 170 },
        { x: 160, y: 170 },
        { x: 190, y: 170 },
        { x: 210, y: 190 }
      ] 
    }
  ],
  // Add more characters as needed
};

interface HandwritingPracticeProps {
  character?: string;
  strokeOrder?: string; // Path to stroke order SVG or GIF
  meaning?: string;
  pronunciation?: string;
  audioPath?: string;
  expectedStrokes?: number;
  examples?: string[];
  tips?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  showControls?: boolean;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

const HandwritingPractice: React.FC<HandwritingPracticeProps> = ({
  character = 'あ',
  strokeOrder = '/assets/strokes/hiragana/あ.gif',
  meaning = 'a (vowel)',
  pronunciation = 'a',
  audioPath = '/assets/audio/hiragana/あ.mp3',
  expectedStrokes = 3,
  examples = [],
  tips = '',
  onNext,
  onPrevious,
  showControls = true,
  level = 'beginner'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [strokeCount, setStrokeCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning' | 'error' | ''>('');
  const [showGuide, setShowGuide] = useState(true);
  const [showStrokeAnimation, setShowStrokeAnimation] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canvasScale, setCanvasScale] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [userStrokes, setUserStrokes] = useState<{ points: { x: number; y: number }[] }[]>([]);
  const [correctedStrokes, setCorrectedStrokes] = useState<{ points: { x: number; y: number }[] }[]>([]);
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(false);

  const baseCanvasSize = 300;

  // Move startDrawing function earlier in the component
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    
    // Get the scaled cursor position
    const scaledPos = getScaledCursorPosition(e);
    setLastPosition(scaledPos);
    setCurrentStroke([scaledPos]); // Start new stroke
    
    // Start drawing visually on the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const scale = canvas.width / baseCanvasSize;
    
    // Set up the stroke style
    context.strokeStyle = '#000000'; // Black for user drawing
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    // Add subtle shadow for depth
    context.shadowColor = 'rgba(0, 0, 0, 0.2)';
    context.shadowBlur = 3;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 1;
    
    context.beginPath();
    context.moveTo(scaledPos.x * scale, scaledPos.y * scale);
  };

  // --- Redraw Canvas Logic ---
  const redrawCanvas = useCallback(() => {
    if (!context || !canvasRef.current) return;
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = canvas.width / baseCanvasSize;

    // Draw based on auto-correct state
    const strokesToDraw = autoCorrectEnabled ? correctedStrokes : userStrokes;
    
    // Enhanced stroke styles with better colors
    const strokeStyle = autoCorrectEnabled ? '#6366f1' : '#18181b'; // More vibrant indigo for corrected, darker black for user
    const lineWidth = autoCorrectEnabled ? 12 : 10; // Thicker lines for better visibility
    
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    // Add shadow effect for depth
    if (autoCorrectEnabled) {
      context.shadowColor = 'rgba(99, 102, 241, 0.5)';
      context.shadowBlur = 6;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 1;
    } else {
      context.shadowColor = 'rgba(0, 0, 0, 0.2)';
      context.shadowBlur = 3;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 1;
    }

    strokesToDraw.forEach((stroke, index) => {
      if (stroke.points.length < 2) return;
      
      // Create a smoother path with bezier curves for more natural writing
      context.beginPath();
      context.moveTo(stroke.points[0].x * scale, stroke.points[0].y * scale);
      
      if (stroke.points.length === 2) {
        // Just a line for two points
        context.lineTo(stroke.points[1].x * scale, stroke.points[1].y * scale);
      } else {
        // Use quadratic curves for smoother lines
        for (let i = 1; i < stroke.points.length - 1; i++) {
          const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2 * scale;
          const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2 * scale;
          context.quadraticCurveTo(
            stroke.points[i].x * scale, 
            stroke.points[i].y * scale, 
            xc, yc
          );
        }
        // Last point
        context.lineTo(
          stroke.points[stroke.points.length - 1].x * scale, 
          stroke.points[stroke.points.length - 1].y * scale
        );
      }
      
      context.stroke();
      context.closePath();
    });

    // Reset shadow
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Reset to default for ongoing drawing if needed
    context.strokeStyle = '#18181b'; // Darker black
    context.lineWidth = 10;

  }, [context, autoCorrectEnabled, userStrokes, correctedStrokes, canvasSize]);

  // Set up canvas context on component mount or character change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up canvas properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    
    setContext(ctx);

    // Adjust canvas size based on device
    const updateCanvasSize = () => {
      const containerWidth = Math.min(window.innerWidth - 40, 400);
      setCanvasSize({
        width: containerWidth,
        height: containerWidth
      });
    };

    // Initial size setup
    updateCanvasSize();
    
    // Listen for resize
    window.addEventListener('resize', updateCanvasSize);

    // Set up audio
    if (audioPath) {
      audioRef.current = new Audio(audioPath);
    }
    
    // Reset state when character changes
    clearCanvas(true);
    setStrokeCount(0);
    setFeedback('');
    setFeedbackType('');
    setAttempts(0);
    setIsCorrect(false);
    setShowGuide(true);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [character, audioPath]);

  // Update canvas when size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !context) return;
    
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Restore context properties after resize
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 10;
    
    redrawCanvas();
  }, [canvasSize, redrawCanvas]);

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    
    // Prevent scrolling on touch devices
    if ('touches' in e) {
      e.preventDefault();
    }
    
    // Get cursor position
    const scaledPos = getScaledCursorPosition(e);
    setCurrentStroke(prev => [...prev, scaledPos]); 
    
    // Draw line from last position to current position
    const canvas = canvasRef.current;
    const scale = canvas.width / baseCanvasSize;
    
    context.lineTo(scaledPos.x * scale, scaledPos.y * scale);
    context.stroke();
    
    setLastPosition(scaledPos);
  };

  const endDrawing = () => {
    if (!isDrawing || !context) return;
    setIsDrawing(false);
    context.closePath();
    
    // Clear shadow effect
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if (currentStroke.length > 1) {
      if (autoCorrectEnabled) {
        // --- Auto-Correct Logic with animation ---
        const correctPatterns = strokePatterns[character];
        if (correctPatterns && strokeCount < correctPatterns.length) {
          // Clear the canvas of the current stroke
          context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          
          // Add the corrected stroke to the collection
          const correctedVersion = correctPatterns[strokeCount];
          setCorrectedStrokes(prev => [...prev, correctedVersion]);
          
          // Increment stroke count
          setStrokeCount(prev => prev + 1);
          
          // Play a subtle "snap" sound for feedback
          try {
            const snapSound = new Audio('/assets/audio/snap.mp3');
            snapSound.volume = 0.2;
            snapSound.play().catch(e => console.log('Audio play error:', e));
          } catch (err) {
            console.log('Audio error:', err);
          }
          
          // Redraw all strokes including the newly corrected one
          setTimeout(() => {
            redrawCanvas();
            
            // Trigger success particle effect when character is complete
            if (strokeCount + 1 === correctPatterns.length) {
              // Last stroke completed - bigger celebration
              setFeedback(`Great job! You completed ${character}!`);
              setFeedbackType('success');
              setIsCorrect(true);
              
              // Celebration sound
              try {
                const successSound = new Audio('/assets/audio/success.mp3');
                successSound.volume = 0.5;
                successSound.play().catch(e => console.log('Audio play error:', e));
              } catch (err) {
                console.log('Audio error:', err);
              }
            }
          }, 10); // Small delay to ensure state updates before redraw
        } else {
          // Fallback to user drawn strokes if no correct pattern available
          setUserStrokes(strokes => [...strokes, { points: currentStroke }]);
          redrawCanvas();
        }
      } else {
        // Manual drawing logic - keep user's strokes as drawn
        setUserStrokes(strokes => [...strokes, { points: currentStroke }]);
        setStrokeCount(prev => prev + 1);
      }
    }
    setCurrentStroke([]);
  };

  const getCursorPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    // Handle both mouse and touch events
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Scale coordinates to canvas size
    x = x * (canvas.width / rect.width);
    y = y * (canvas.height / rect.height);
    
    return { x, y };
  };

  const getScaledCursorPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    // Handle both mouse and touch events
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Scale coordinates to canvas size
    x = x * (baseCanvasSize / rect.width);
    y = y * (baseCanvasSize / rect.height);
    
    return { x, y };
  };

  const clearCanvas = (resetState = false) => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setStrokeCount(0);
    setFeedback('');
    setFeedbackType('');
    setUserStrokes([]);
    setCorrectedStrokes([]);
    redrawCanvas();

    if (resetState) {
      setAttempts(0);
      setScore(0);
      setIsCorrect(false);
      setShowGuide(true);
    }
  };

  const checkCharacter = () => {
    // Increment attempts
    setAttempts(prev => prev + 1);
    
    // In a real app, this would use ML/AI to evaluate the drawn character
    // For now, we'll provide feedback based on stroke count
    
    if (strokeCount === 0) {
      setFeedback('Please draw something first.');
      setFeedbackType('warning');
      return;
    }
    
    // Check if stroke count matches expected
    if (strokeCount === expectedStrokes) {
      setFeedback(`Great job! Your ${strokeCount} stroke(s) is correct.`);
      setFeedbackType('success');
      setScore(prev => prev + 10);
      setIsCorrect(true);
      
      // Play success sound
      const successSound = new Audio('/assets/audio/success.mp3'); // Add this audio file
      successSound.volume = 0.5;
      successSound.play().catch(e => console.log('Audio play error:', e));
    } else if (Math.abs(strokeCount - expectedStrokes) <= 1) {
      setFeedback(`Close! The correct stroke count is ${expectedStrokes}.`);
      setFeedbackType('warning');
      setScore(prev => prev + 5);
    } else if (strokeCount < expectedStrokes) {
      setFeedback(`You used too few strokes. Try using ${expectedStrokes} strokes.`);
      setFeedbackType('error');
    } else {
      setFeedback(`You used too many strokes. Try using ${expectedStrokes} strokes.`);
      setFeedbackType('error');
    }
  };

  // --- Toggle Auto-Correct function ---
  const handleAutoCorrectToggle = (checked: boolean) => {
    setAutoCorrectEnabled(checked);
    
    // Clear canvas when toggling to provide a clean slate
    clearCanvas();
    
    // Optional: Add visual feedback for mode change
    setFeedback(checked 
      ? "Auto-correction enabled! Your strokes will be corrected as you draw." 
      : "Auto-correction disabled. Draw freely.");
    setFeedbackType(checked ? 'success' : 'warning');
    
    // Clear feedback after a short delay
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 2000);
  };

  // Function to toggle the tips panel
  const toggleTips = () => {
    setShowTips(prev => !prev);
  };

  // Function to toggle the guide visibility
  const toggleGuide = () => {
    setShowGuide(prev => !prev);
  };

  // Function to play audio pronunciation - fixed
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play error:', e));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-indigo-500 dark:border-t-indigo-400 rounded-xl overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl font-semibold text-indigo-600 dark:text-indigo-400">{character}</span>
              </motion.div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {character}
                  </CardTitle>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{pronunciation}</span>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={playAudio}
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all"
                    >
                      <Volume2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </Button>
                  </motion.div>
                </div>
                <CardDescription className="mt-1 text-gray-600 dark:text-gray-400 font-medium">
                  {meaning}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="outline"
                        onClick={toggleTips}
                        className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                      >
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                    <p>Character Info & Tips</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Tips panel with enhanced animation */}
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl text-sm border border-blue-100 dark:border-blue-900/50"
              >
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Character Information
                </h3>
                <p className="text-blue-700 dark:text-blue-200 mb-3 leading-relaxed">
                  {tips || `${character} has ${strokePatterns[character]?.length || expectedStrokes} strokes. Pay attention to stroke order and direction.`}
                </p>

                {examples && examples.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mt-3 mb-2 flex items-center">
                      <Brush className="h-4 w-4 mr-2" />
                      Example Words
                    </h4>
                    <ul className="list-disc pl-5 text-blue-700 dark:text-blue-200 grid grid-cols-2 gap-1">
                      {examples.map((example, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.05), duration: 0.2 }}
                        >
                          {example}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardHeader>

        <CardContent className="pt-5">
          <Tabs defaultValue="practice" className="w-full">
            <TabsList className="grid grid-cols-2 mb-5 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg">
              <TabsTrigger 
                value="practice" 
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:font-medium data-[state=active]:shadow-sm transition-all duration-200"
              >
                Practice
              </TabsTrigger>
              <TabsTrigger 
                value="strokeOrder" 
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:font-medium data-[state=active]:shadow-sm transition-all duration-200"
              >
                Stroke Order
              </TabsTrigger>
            </TabsList>

            <TabsContent value="practice" className="space-y-4 mt-2">
              {/* Auto-Correct Toggle with improved styling */}
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Switch
                  id="auto-correct-switch"
                  checked={autoCorrectEnabled}
                  onCheckedChange={handleAutoCorrectToggle}
                  aria-label="Toggle Auto-Correct"
                  className="data-[state=checked]:bg-indigo-600"
                />
                <Label 
                  htmlFor="auto-correct-switch" 
                  className={`text-sm font-medium ${autoCorrectEnabled 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-400'}`}
                >
                  Auto-Correct {autoCorrectEnabled ? 'On' : 'Off'} 
                  <span className="ml-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full">Duolingo Style</span>
                </Label>
              </div>

              <div className="flex flex-col items-center">
                <motion.div 
                  className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md"
                  style={{ width: canvasSize.width, height: canvasSize.height }}
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <canvas
                    ref={canvasRef}
                    className="bg-white dark:bg-gray-900 touch-none"
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    onTouchCancel={endDrawing}
                  />

                  {/* Character guide with darker appearance */}
                  <AnimatePresence>
                    {showGuide && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}  // Increased from 0.35 to 0.5 for better visibility
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <span 
                          className="text-gray-400 dark:text-gray-600 font-light select-none" // Changed from 300/700 to 400/600 for darker appearance
                          style={{ fontSize: `${canvasSize.width * 0.7}px` }}
                        >
                          {character}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="flex items-center justify-between w-full max-w-xs mt-4 gap-3 text-sm">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-full px-3 py-1.5 shadow-sm">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">Strokes:</span>
                    <span className="ml-1 text-gray-700 dark:text-gray-300">{strokeCount}</span>
                    <span className="mx-1.5 text-gray-400 dark:text-gray-600">•</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">Expected:</span>
                    <span className="ml-1 text-gray-700 dark:text-gray-300">{strokePatterns[character]?.length || expectedStrokes}</span>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={showGuide ? "secondary" : "outline"}
                      size="sm"
                      className={`h-8 rounded-full transition-all ${
                        showGuide 
                          ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50' 
                          : 'hover:text-indigo-600 hover:border-indigo-300 dark:hover:text-indigo-400 dark:hover:border-indigo-800'
                      }`}
                      onClick={toggleGuide}
                    >
                      {showGuide ? 'Hide Guide' : 'Show Guide'}
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Feedback Section with enhanced animation */}
              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-4 rounded-xl text-center mt-4 shadow-sm ${
                      feedbackType === 'success'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/30'
                        : feedbackType === 'warning'
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30'
                        : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {feedbackType === 'success' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                        >
                          <Star className="h-6 w-6 text-yellow-500 fill-current" />
                        </motion.div>
                      )}
                      <span className="font-medium">{feedback}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Control buttons with improved styling */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    onClick={() => clearCanvas(true)} 
                    variant="outline" 
                    className="w-full flex items-center justify-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl h-11 transition-all"
                  >
                    <Eraser className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" /> Clear
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={checkCharacter}
                    variant="default"
                    className={`w-full flex items-center justify-center rounded-xl h-11 transition-all ${
                      isCorrect 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-700 dark:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-700 dark:to-violet-700 dark:hover:from-indigo-600 dark:hover:to-violet-600 text-white'
                    }`}
                    disabled={isCorrect && !autoCorrectEnabled}
                  >
                    <Check className="h-4 w-4 mr-2" /> {isCorrect ? 'Correct!' : 'Check'}
                  </Button>
                </motion.div>
              </div>
            </TabsContent>

            {/* Stroke Order Tab with enhanced styling */}
            <TabsContent value="strokeOrder" className="flex flex-col items-center space-y-6 mt-2">
              <motion.div
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={strokeOrder}
                  alt={`Stroke order for ${character}`}
                  className="max-w-full h-auto"
                  style={{ width: Math.min(400, window.innerWidth - 40) }}
                />
              </motion.div>

              <div className="flex flex-col space-y-3 w-full max-w-md">
                <motion.div 
                  className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                    <Brush className="h-4 w-4 mr-2" />
                    Stroke Order Tips
                  </h4>
                  <ul className="text-sm list-disc list-inside text-amber-700 dark:text-amber-200 space-y-1.5">
                    <li>Generally write from top to bottom</li>
                    <li>Generally write from left to right</li>
                    <li>Horizontal strokes before vertical strokes that cross them</li>
                    <li>Center strokes before edge strokes</li>
                    <li>Left-falling strokes before right-falling ones</li>
                  </ul>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Footer Controls with improved styling */}
        {showControls && (
          <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <motion.div whileHover={{ scale: 1.05, x: -3 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!onPrevious}
                className="flex items-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onNext}
                disabled={!onNext || (!isCorrect && !autoCorrectEnabled)}
                className={`flex items-center rounded-xl transition-all disabled:opacity-50 ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'
                }`}
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default HandwritingPractice;