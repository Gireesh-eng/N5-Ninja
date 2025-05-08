import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SendIcon, User, Bot, RefreshCw, Sparkles, Mic, Search, X, ChevronDown, Settings, Save, Volume2, VolumeX, Plus, History, MoreVertical } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useUser } from '@/contexts/UserContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, setDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// Add Web Speech API type definitions
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    onstart: () => void;
}

interface SpeechRecognitionEvent {
    resultIndex: number;
    results: {
        [index: number]: {
            isFinal: boolean;
            [index: number]: {
                transcript: string;
            };
        };
        length: number;
    };
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
        readonly speechSynthesis: SpeechSynthesis; // Add readonly modifier to match the global definition
        SpeechSynthesisUtterance: typeof SpeechSynthesisUtterance;
    }
}

// Add this new component outside the Chat component

interface VoiceAssistantModalProps {
  onClose: () => void;
  onSendVoiceMessage: (message: string) => Promise<void>;
  isTyping: boolean;
}

const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ onClose, onSendVoiceMessage, isTyping }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Start listening when the modal opens
  useEffect(() => {
    startListening();
    
    // Cleanup function to stop listening when modal closes
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US'; // Set to English for input
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setStatus("listening");
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      setTranscript(finalTranscript || interimTranscript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      
      // If we have a transcript, send it to the bot
      if (transcript.trim()) {
        setStatus("processing");
        onSendVoiceMessage(transcript.trim())
          .then(() => setStatus("speaking"))
          .catch(() => setStatus("idle"));
      } else {
        setStatus("idle");
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setStatus("idle");
    };

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
      setStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-medium">AI Voice Assistant</h2>
            </div>
            <button 
              onClick={() => {
                // Cancel any ongoing speech before closing
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-center py-8">
            {status === "listening" && (
              <div className="mb-4">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-3 bg-blue-500/30 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mic className="h-12 w-12 text-indigo-600" />
                  </div>
                </div>
                <p className="text-lg font-medium">Listening...</p>
                {transcript && <p className="mt-2 text-gray-600 dark:text-gray-400">{transcript}</p>}
              </div>
            )}
            
            {status === "processing" && (
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
                <p className="text-lg font-medium">Processing...</p>
              </div>
            )}
            
            {status === "speaking" && (
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-8 bg-indigo-400 rounded-full animate-sound-wave"></div>
                    <div className="w-2 h-12 bg-indigo-500 rounded-full animate-sound-wave" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-16 bg-indigo-600 rounded-full animate-sound-wave" style={{ animationDelay: "0.4s" }}></div>
                    <div className="w-2 h-10 bg-indigo-500 rounded-full animate-sound-wave" style={{ animationDelay: "0.6s" }}></div>
                    <div className="w-2 h-6 bg-indigo-400 rounded-full animate-sound-wave" style={{ animationDelay: "0.8s" }}></div>
                  </div>
                </div>
                <p className="text-lg font-medium">Speaking...</p>
              </div>
            )}
            
            {status === "idle" && (
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <button
                    onClick={startListening}
                    className="w-20 h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Mic className="h-10 w-10" />
                  </button>
                </div>
                <p className="text-lg font-medium">Tap to speak</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                // Cancel any ongoing speech before closing
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              variant="outline"
              className="mx-2"
            >
              Close
            </Button>
            {!isListening && status !== "processing" && (
              <Button
                onClick={startListening}
                className="mx-2 bg-indigo-600 hover:bg-indigo-700"
                disabled={isTyping}
              >
                <Mic className="h-4 w-4 mr-2" />
                {status === "speaking" ? "Speak Again" : "Speak"}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Add the sound wave animation */}
      <style >{`
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-sound-wave {
          animation: soundWave 1s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
};

// Near the top of Chat.tsx
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("VITE_GEMINI_API_KEY loaded:", API_KEY ? `Yes (length ${API_KEY.length})` : "No/Undefined"); // Check Vite terminal output

let genAI: GoogleGenerativeAI | null = null;
let initializationError = false;

if (!API_KEY) {
    console.error("FATAL: Missing Gemini API Key. Please check your .env file and ensure VITE_GEMINI_API_KEY is set.");
    initializationError = true;
} else {
    try {
        genAI = new GoogleGenerativeAI(API_KEY);
    } catch (error) {
        console.error("FATAL: Error initializing GoogleGenerativeAI:", error);
        initializationError = true;
    }
}

// --- Text-to-Speech Function with Female Voice Preference ---
const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        console.warn("Speech synthesis not supported in this environment.");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean up text before processing
    let cleanText = text
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')  // Remove emoji
        .trim();

    // Extract and remove Japanese words with romanization
    const romanizationPattern = /([\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー]+)\s*\(([^)]+)\)/gu;

    // Build a list of speech segments with appropriate language
    const speechSegments = [];

    // Get all matches and their positions
    const matches = [...cleanText.matchAll(romanizationPattern)];
    let lastIndex = 0;

    for (const match of matches) {
        const [fullMatch, japaneseText, romanization] = match;
        const matchIndex = match.index || 0;

        // Add any text before this match as English
        if (matchIndex > lastIndex) {
            const beforeText = cleanText.substring(lastIndex, matchIndex).trim();
            if (beforeText) {
                speechSegments.push({
                    text: beforeText,
                    lang: 'en-US'
                });
            }
        }

        // Add the Japanese text
        speechSegments.push({
            text: japaneseText,
            lang: 'ja-JP'
        });

        // Update the last position after this match
        lastIndex = matchIndex + fullMatch.length;
    }

    // Add any remaining text as English
    if (lastIndex < cleanText.length) {
        const remainingText = cleanText.substring(lastIndex).trim();
        if (remainingText) {
            speechSegments.push({
                text: remainingText,
                lang: 'en-US'
            });
        }
    }

    // If no segments were created (no matches found), just speak the whole text as English
    if (speechSegments.length === 0) {
        speechSegments.push({
            text: cleanText,
            lang: 'en-US'
        });
    }

    console.log("Speech segments:", speechSegments);

    // Speak each segment with appropriate female voice
    const speakSegment = (index = 0) => {
        if (index >= speechSegments.length) return;

        const segment = speechSegments[index];
        const utterance = new SpeechSynthesisUtterance(segment.text);
        utterance.lang = segment.lang; // Set language for the utterance

        // Select appropriate voice
        const voices = window.speechSynthesis.getVoices();
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`)); // Log available voices

        let preferredVoice: SpeechSynthesisVoice | undefined;

        // --- Modified Voice Selection Logic ---
        if (segment.lang.startsWith('ja')) {
            // Japanese Segment: Prioritize Zira, then any Japanese voice
            console.log("Looking for Japanese voice (Zira preferred)...");
            // 1. Try to find Zira specifically (might be associated with en-US but used for JP)
            preferredVoice = voices.find(voice => voice.name.toLowerCase().includes("zira"));

            // 2. If Zira not found, try any voice explicitly marked as Japanese (ja-JP or ja)
            if (!preferredVoice) {
                preferredVoice = voices.find(voice => voice.lang.startsWith('ja'));
            }
            // 3. If still no Japanese voice, log it (will fallback to default later)
            if (!preferredVoice) {
                 console.log("No specific Japanese voice (including Zira) found.");
            }

        } else {
            // English Segment: Use existing logic (prefer female English)
            console.log("Looking for English voice (female preferred)...");
            // 1. Try to find a female voice for English
            preferredVoice = voices.find(voice =>
                voice.lang.startsWith('en') &&
                (voice.name.toLowerCase().includes("female") || voice.name.toLowerCase().includes("zira") || voice.name.toLowerCase().includes("susan") || voice.name.toLowerCase().includes("karen"))
            );
            // 2. If no female English voice, log it (will fallback to default later)
             if (!preferredVoice) {
                 console.log("No specific female English voice found.");
            }
        }

        // Final Fallback: Use the default voice if no specific voice was found above
        if (!preferredVoice) {
             console.log("Falling back to default system voice.");
             preferredVoice = voices.find(voice => voice.default);
        }
        // --- End of Modified Voice Selection Logic ---


        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log(`Speaking segment "${segment.text.substring(0, 20)}..." with voice: ${preferredVoice.name} (${preferredVoice.lang})`);
        } else {
            // This case should be less likely now with the default fallback
            console.log(`No voice found (not even default?), using browser absolute default for segment "${segment.text.substring(0, 20)}..."`);
        }

        // Adjust voice properties for a better experience
        utterance.pitch = 1.0;
        utterance.rate = 1.0; // Adjust rate if needed, e.g., 0.9 for slightly slower

        // When this segment finishes, speak the next one
        utterance.onend = () => speakSegment(index + 1);

        // Handle potential errors during speech
        utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event.error, "for utterance:", segment.text);
            // Optionally try to continue with the next segment even if one fails
            // speakSegment(index + 1);
        };

        // Speak this segment
        window.speechSynthesis.speak(utterance);
    };

    // Start speaking from the first segment
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            console.log("Voices loaded, starting speech.");
            speakSegment(0);
            window.speechSynthesis.onvoiceschanged = null; // Prevent multiple calls
        };
        // Add a timeout as a fallback in case onvoiceschanged doesn't fire reliably
        setTimeout(() => {
             if (window.speechSynthesis.getVoices().length > 0 && !window.speechSynthesis.speaking) {
                 console.log("Voices loaded via timeout, starting speech.");
                 speakSegment(0);
             }
        }, 500); // Increased timeout slightly
    } else {
        speakSegment(0);
    }
};

// --- Inside the speakWithElevenLabs function ---

// *** Choose a different Voice ID if desired ***
// Example: const ELEVENLABS_VOICE_ID = 'zrHiDhphv9ZnVXBqCLjz'; // Mimi (Try different IDs)
const ELEVENLABS_VOICE_ID = 'ecp3DWciuUyW7BYM7II1'; // Default: Rachel

// Define ElevenLabs API Key and URL
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

// Define the function to handle ElevenLabs TTS
const speakWithElevenLabs = async (text: string) => {
    // Check if ElevenLabs API Key is available
    if (!ELEVENLABS_API_KEY) {
        console.error("ElevenLabs API Key not found. Text-to-speech using ElevenLabs will be disabled.");
        // Optionally handle this case, e.g., fallback to browser TTS or show an error
        return; // Or throw an error, depending on desired behavior
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: text, // Now 'text' refers to the function parameter
                model_id: 'eleven_multilingual_v2', // Good general model
                voice_settings: {
                    // --- Adjust these settings ---
                    stability: 0.6, // Increase slightly for more consistency (Range 0-1)
                    similarity_boost: 0.75, // Keep high to resemble base voice (Range 0-1)
                    style: 0.15, // Lower value reduces expressiveness, making it sound more "TTS-like" (Range 0-1)
                    use_speaker_boost: true // Keep true for clarity
                    // --- End of adjustments ---
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`ElevenLabs API Error: ${response.status} ${response.statusText}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        // Consider adding event listeners for 'ended' to revokeObjectURL, and 'error' for handling playback issues.
        // audio.onended = () => URL.revokeObjectURL(audioUrl);
        // audio.onerror = (e) => console.error("Audio playback error:", e);

    } catch (error) {
        console.error("Error calling ElevenLabs API:", error);
        // Optionally fallback to browser TTS or show an error message
        // speakText(text); // Example fallback
    }
};


const Chat = () => {
    // Use the useUser hook to get the current user
    const { user } = useUser();
    
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ type: string; text: string; japanese?: string; timestamp?: number }[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    
    // Add these missing state variables
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    
    const [showVoiceModal, setShowVoiceModal] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [userName, setUserName] = useState("");
    
    // Add the missing suggestedQuestions state
    const [suggestedQuestions, setSuggestedQuestions] = useState([
        "How do I use the particle は?",
        "Explain the difference between です and います",
        "Can you help me practice counting in Japanese?",
        "What's the difference between を and が?"
    ]);
    
    const [userNameInput, setUserNameInput] = useState("");
    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('autoSpeak');
            return saved ? saved === 'true' : true;
        }
        return true;
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<number[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [botTypingText, setBotTypingText] = useState("");
    const [typingSpeed, setTypingSpeed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('typingSpeed');
            return saved ? parseInt(saved) : 30; // Default 30ms per character
        }
        return 30;
    });
    const [showSettingsDialog, setShowSettingsDialog] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // Add these state variables below the existing state declarations
    const [userChats, setUserChats] = useState<{id: string; title: string; lastUpdated: number}[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [showChatHistory, setShowChatHistory] = useState(false);

    // Add this new reference for the page container
    const pageContainerRef = useRef<HTMLDivElement>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    const searchResultRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Add a state to track which message is currently being spoken
    const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);

    // Load chat history from Firestore when user changes
    useEffect(() => {
        const loadUserChatHistory = async () => {
            // Reset state when user changes
            setIsLoadingHistory(true);
            setChatHistory([]);
            setUserName("");
            setShowNamePrompt(false);
            
            if (user?.uid) {
                try {
                    // First, load the user's chat name if it exists
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userRef);
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        
                        // Set user name if it exists
                        if (userData.chatName) {
                            console.log("Found chat name:", userData.chatName);
                            setUserName(userData.chatName);
                            setUserNameInput(userData.chatName);
                            setShowNamePrompt(false);
                        } else {
                            console.log("No chat name found, showing prompt");
                            setShowNamePrompt(true);
                            setUserNameInput(user.name || "");
                        }
                    } else {
                        // No user document exists yet, show name prompt
                        console.log("No user document exists yet");
                        setShowNamePrompt(true);
                        setUserNameInput(user.name || "");
                    }

                    // Next, check for existing chats
                    const chatsRef = collection(db, "users", user.uid, "chats");
                    const q = query(chatsRef, orderBy("lastUpdated", "desc"));
                    const querySnapshot = await getDocs(q);
                    
                    const chats = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().title || "Untitled conversation",
                        lastUpdated: doc.data().lastUpdated?.toMillis() || Date.now()
                    }));
                    
                    setUserChats(chats);
                    
                    if (chats.length > 0) {
                        // Set the most recent chat as current and load it
                        const mostRecentChatId = chats[0].id;
                        setCurrentChatId(mostRecentChatId);
                        
                        // Load the chat content
                        const chatRef = doc(db, "users", user.uid, "chats", mostRecentChatId);
                        const chatDoc = await getDoc(chatRef);
                        
                        if (chatDoc.exists() && chatDoc.data().messages) {
                            setChatHistory(chatDoc.data().messages);
                        } else {
                            // Set default welcome message if this chat has no messages
                            setChatHistory([{
                                type: "bot",
                                text: "こんにちは！I'm your Japanese learning assistant. How can I help you today?",
                                japanese: "こんにちは！",
                                timestamp: Date.now()
                            }]);
                        }
                    } else {
                        // No chats exist yet, create a new one
                        await createNewChat();
                    }
                } catch (error) {
                    console.error("Error loading chat history:", error);
                    // Set default message on error
                    setChatHistory([{
                        type: "bot",
                        text: "こんにちは！I'm your Japanese learning assistant...",
                        japanese: "こんにちは！",
                        timestamp: Date.now()
                    }]);
                }
            } else {
                // No user logged in, use default welcome message
                console.log("No user logged in");
                setChatHistory([{
                    type: "bot",
                    text: "こんにちは！I'm your Japanese learning assistant...",
                    japanese: "こんにちは！",
                    timestamp: Date.now()
                }]);
            }
            
            setIsLoadingHistory(false);
        };
        
        loadUserChatHistory();
    }, [user?.uid]);

    // Save chat history to Firestore when it changes
    useEffect(() => {
        const saveChatHistory = async () => {
            if (user?.uid && !isLoadingHistory && chatHistory.length > 0 && currentChatId) {
                try {
                    // Save to the specific chat document instead of the user document
                    const chatRef = doc(db, "users", user.uid, "chats", currentChatId);
                    await updateDoc(chatRef, {
                        messages: chatHistory,
                        title: determineTitle(chatHistory),
                        updatedAt: serverTimestamp()
                    });
                    console.log(`Saved chat history to chat ${currentChatId}`);
                } catch (error) {
                    console.error("Error saving chat history:", error);
                }
            }
        };
        
        // Debounce the save operation to avoid too many writes
        const saveTimer = setTimeout(() => {
            saveChatHistory();
        }, 2000);
        
        return () => clearTimeout(saveTimer);
    }, [chatHistory, user?.uid, isLoadingHistory, currentChatId]);
    
    // Load specific chat history when currentChatId changes
    useEffect(() => {
        if (currentChatId && user?.uid) {
            console.log(`useEffect[currentChatId]: Loading history for chat ID: ${currentChatId}`); // Log: Effect trigger
            loadChatHistory(currentChatId);
        } else {
             console.log(`useEffect[currentChatId]: Skipping load, chatId: ${currentChatId}, userId: ${user?.uid}`); // Log: Skip
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatId]); // Intentionally depend only on currentChatId to load when it changes
    
    // Helper function to determine a title from the chat history
    const determineTitle = (messages: { type: string; text: string; japanese?: string; timestamp?: number }[]): string => {
        // Find first user message and use beginning as title
        const firstUserMessage = messages.find(msg => msg.type === "user");
        if (firstUserMessage && firstUserMessage.text) {
            // Return first 20 chars of message or whole message if shorter
            const title = firstUserMessage.text.substring(0, 20);
            return title + (firstUserMessage.text.length > 20 ? "..." : "");
        }
        return "New conversation";
    };

    // Save user preferences
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('autoSpeak', autoSpeak.toString());
        }
    }, [autoSpeak]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('typingSpeed', typingSpeed.toString());
        }
    }, [typingSpeed]);

    // Add this effect to scroll page to top when component mounts
    useEffect(() => {
        // This will ensure page is scrolled to top when Chat component first mounts
        window.scrollTo(0, 0);
        
        // Also handle if there's any scroll position in the container itself
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTop = 0;
        }
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        if (searchResults.length > 0 && currentSearchIndex < searchResults.length) {
            scrollToSearchResult(currentSearchIndex);
        }
    }, [searchResults, currentSearchIndex]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToSearchResult = (index: number) => {
        if (searchResultRefs.current[index]) {
            searchResultRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        const trimmedMessage = message.trim();
        if (!trimmedMessage || isTyping || isListening) return;

        setChatHistory(prev => [...prev, { type: "user", text: trimmedMessage, timestamp: Date.now() }]);
        setMessage("");
        handleBotResponse(trimmedMessage);
    };

    // Typing animation effect for bot responses
    const animateTyping = (text: string) => {
        setBotTypingText("");
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                setBotTypingText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);
                // Add the complete bot response to history after typing animation
                const japaneseMatch = text.match(/([\u3040-\u30FF\u4E00-\u9FAF]+(?:\([a-zA-Z]+\))?)/);
                let extractedJapanese = "";
                if (japaneseMatch && japaneseMatch[1].length > 1 && japaneseMatch[1].length < 25) {
                    extractedJapanese = japaneseMatch[1].split(/[,.?!。？！]/)[0].trim();
                }
                
                setChatHistory(prev => [
                    ...prev,
                    { type: "bot", text, japanese: extractedJapanese, timestamp: Date.now() }
                ]);
                
                // Speak the response if autoSpeak is enabled
                if (autoSpeak) {
                    speakWithElevenLabs(text);
                }
                
                setTimeout(scrollToBottom, 50);
            }
        }, typingSpeed); // Adjust typing speed here
    };

    const handleBotResponse = async (userMessage: string) => {
        if (initializationError) {
            const errorMsg = "Sorry, the AI service could not be initialized. Please check the console for errors (API Key?).";
            setChatHistory(prev => [...prev, { 
                type: "bot", 
                text: errorMsg, 
                japanese: "エラー！",
                timestamp: Date.now()
            }]);
            if (autoSpeak) {
                speakWithElevenLabs(errorMsg);
            }
            return;
        }
        if (!genAI) {
            console.error("genAI not initialized");
            return;
        }

        setIsTyping(true);
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        // Get personalized greeting based on username
        const personalizedGreeting = userName ? `, ${userName}` : '';

        const conversationHistoryForPrompt = chatHistory
            .slice(-6)
            .map(msg => `${msg.type === "user" ? "User" : "Tutor"}: ${msg.text}`)
            .join("\n");

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

            // Updated Prompt with user name if available
            const prompt = `You are a friendly and knowledgeable AI assistant.

              Previous conversation context (last few messages):
                ${conversationHistoryForPrompt}

              Current user question:
              User${personalizedGreeting}: "${userMessage}"

              Instructions:
                1. Keep responses SHORT (max 3-4 lines) and DIRECT. Be helpful but concise.
                2. Use natural, conversational English. Sound friendly but efficient.
                3. If the question is about Japanese: Use appropriate writing (hiragana/katakana/kanji) with romaji in parentheses. Example: こんにちは (konnichiwa). Focus on JLPT N5 level concepts unless asked otherwise.
                4. If the question is NOT about Japanese: Answer directly and concisely based on your general knowledge.
                5. Focus on accuracy and clarity over lengthy explanations.
                6. Avoid unnecessary pleasantries or repetitive phrases at the beginning or end.
                7. Do not use markdown formatting like bold (**), italics (*), or lists (-). Use plain text.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();
            text = text.replace(/[*`]/g, '');
            text = text.replace(/^Tutor:\s*/, '');
            
            // Start the typing animation instead of immediately adding to history
            animateTyping(text);

        } catch (error: any) {
            console.error("Gemini API error:", error);
            let errorMessage = "Sorry, something went wrong while getting a response. Please try again. (ごめんなさい、エラーが出ました！)";
            if (error.message.includes('API key not valid')) {
                errorMessage = "Sorry, the API Key seems invalid. Please check the configuration. (APIキーが無効です)";
            } else if (error.message.includes('fetch failed') || error.message.includes('NetworkError')) {
                errorMessage = "Sorry, there was a network issue. Please check your connection and try again. (ネットワークエラー)";
            }
            setChatHistory(prev => [
                ...prev, { 
                    type: "bot", 
                    text: errorMessage, 
                    japanese: "エラー！",
                    timestamp: Date.now()
                }
            ]);
            if (autoSpeak) {
                speakWithElevenLabs(errorMessage);
            }
            setIsTyping(false);
            setTimeout(scrollToBottom, 50);
        }
    };

    const handleVoiceMessage = async (transcript: string): Promise<void> => {
        // Add the user message to chat history
        setChatHistory(prev => [...prev, { type: "user", text: transcript }]);
        
        // Process with the bot and get a response
        if (initializationError) {
          const errorMsg = "Sorry, the AI service could not be initialized. Please check the console for errors (API Key?).";
          setChatHistory(prev => [...prev, { type: "bot", text: errorMsg, japanese: "エラー！" }]);
          speakText(errorMsg); // Speak the error message
          return Promise.reject(new Error(errorMsg));
        }
        
        if (!genAI) {
          console.error("genAI not initialized");
          return Promise.reject(new Error("AI not initialized"));
        }
      
        setIsTyping(true);
        
        // Cancel any previous speech before fetching new response
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      
        const conversationHistoryForPrompt = chatHistory
          .slice(-6)
          .map(msg => `${msg.type === "user" ? "User" : "Tutor"}: ${msg.text}`)
          .join("\n");
      
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
          const prompt = `You are a friendly and patient Japanese language tutor specializing ONLY in JLPT N5 level concepts...
          // ... rest of your prompt ...
          `;
      
          const result = await model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();
          text = text.replace(/[*`]/g, '');
          text = text.replace(/^Tutor:\s*/, '');
      
          const japaneseMatch = text.match(/([\u3040-\u30FF\u4E00-\u9FAF]+(?:\([a-zA-Z]+\))?)/);
          let extractedJapanese = "";
          if (japaneseMatch && japaneseMatch[1].length > 1 && japaneseMatch[1].length < 25) {
            extractedJapanese = japaneseMatch[1].split(/[,.?!。？！]/)[0].trim();
          }
      
          // Add bot response to history
          setChatHistory(prev => [
            ...prev,
            { type: "bot", text, japanese: extractedJapanese }
          ]);
      
          // Always speak the response for voice messages
          speakWithElevenLabs(text);
          
          setIsTyping(false);
          setTimeout(scrollToBottom, 50);
          return Promise.resolve();
        } catch (error: any) {
          console.error("Gemini API error:", error);
          let errorMessage = "Sorry, something went wrong while getting a response. Please try again.";
          // ... error handling ...
          
          setChatHistory(prev => [
            ...prev, { type: "bot", text: errorMessage, japanese: "エラー！" }
          ]);
          
          speakWithElevenLabs(errorMessage);
          setIsTyping(false);
          return Promise.reject(error);
        }
    };

    const handleSuggestedQuestion = (question: string) => {
        if (isTyping) return;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setChatHistory(prev => [...prev, { 
            type: "user", 
            text: question,
            timestamp: Date.now()
        }]);
        setMessage("");
        handleBotResponse(question);
        inputRef.current?.focus();
    };

    const clearChat = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmClearChat = async () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        const welcomeMessage = userName 
            ? `Chat cleared! How can I help you with JLPT N5 today, ${userName}?` 
            : "Chat cleared! How can I help you with JLPT N5 today?";
        
        const newChatHistory = [{
            type: "bot",
            text: welcomeMessage,
            japanese: "こんにちは！",
            timestamp: Date.now()
        }];
        
        setChatHistory(newChatHistory);
        setMessage("");
        setShowDeleteConfirmation(false);
        setBotTypingText("");
        setSearchTerm("");
        setIsSearching(false);
        setSearchResults([]);
        
        // Save the cleared chat to Firestore
        if (user?.uid) {
            try {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    chatHistory: newChatHistory,
                    updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error("Error saving cleared chat history:", error);
            }
        }
    };

    // Handle user name submission
    const handleNameSubmit = async () => {
        if (userNameInput.trim()) {
            const newName = userNameInput.trim();
            console.log("Saving chat name to Firestore:", newName); // Debug log
            setUserName(newName);
            setShowNamePrompt(false);
            
            // Save the name to Firestore if user is logged in
            if (user?.uid) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    
                    // Using setDoc with merge:true instead of updateDoc to ensure the field is created
                    // This will work even if the document doesn't exist yet
                    await setDoc(userRef, {
                        chatName: newName,
                        updatedAt: serverTimestamp()
                    }, { merge: true });
                    
                    console.log("Successfully saved chat name to Firestore"); // Debug log
                } catch (error) {
                    console.error("Error saving user chat name:", error);
                }
            } else {
                console.log("No user logged in, can't save chat name"); // Debug log
            }
            
            // Add a personalized welcome message
            const welcomeMessage = `Nice to meet you, ${newName}! I'm your Japanese learning assistant. Feel free to ask me anything about JLPT N5 Japanese!`;
            setChatHistory(prev => [...prev, { 
                type: "bot", 
                text: welcomeMessage,
                japanese: "よろしく！",
                timestamp: Date.now()
            }]);
            
            if (autoSpeak) {
                speakWithElevenLabs(welcomeMessage);
            }
        } else {
            setShowNamePrompt(false);
        }
    };

    // Search in chat history
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }
        
        const results = chatHistory.reduce((indices: number[], msg, index) => {
            if (msg.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                indices.push(index);
            }
            return indices;
        }, []);
        
        setSearchResults(results);
        setCurrentSearchIndex(0);
        if (results.length > 0) {
            // Reset refs array to match the new search results
            searchResultRefs.current = results.map(() => null);
        }
    };

    // --- Speech Recognition Logic ---
    const startListening = () => {
        if (isListening) return;

        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = 'ja-JP';
            recognitionRef.current.interimResults = true;
            recognitionRef.current.continuous = false;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setMessage('');
            };

            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                 setMessage(finalTranscript || interimTranscript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                inputRef.current?.focus(); // Focus input to allow sending
            };

            recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                if (event.error === 'no-speech') {
                    alert('No speech was detected. Please try speaking clearly.');
                } else if (event.error === 'network') {
                    alert('Network error during speech recognition. Check connection.');
                } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                     alert('Microphone access denied. Please allow microphone access in browser settings.');
                } else if (event.error === 'aborted') {
                    console.log('Speech recognition aborted.');
                } else {
                    alert(`Speech recognition error: ${event.error}`);
                }
            };

            try {
                recognitionRef.current.start();
            } catch (error) {
                 console.error("Error starting speech recognition:", error);
                 setIsListening(false);
                 alert("Could not start speech recognition. Check microphone & permissions.");
            }

        } else {
            alert('Sorry, speech recognition is not supported in your browser.');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            // onend will set isListening to false
        }
    };

    const formatTimestamp = (timestamp: number | undefined): string => {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();
        
        if (isToday) {
            return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (isYesterday) {
            return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString([], { 
                month: 'short', 
                day: 'numeric' 
            }) + ' at ' + date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    };

    // Function to handle speaking specific chat message
    const handleSpeakMessage = (index: number, text: string) => {
        // If this message is already speaking, stop it
        if (speakingMessageIndex === index) {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            setSpeakingMessageIndex(null);
            return;
        }
        
        // Stop any ongoing speech
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        
        // Set this message as the one being spoken
        setSpeakingMessageIndex(index);
        
        // Speak the message
        speakWithElevenLabs(text);
        
        // Add an event listener to reset the speaking state when speech ends
        const checkSpeechEnd = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
                setSpeakingMessageIndex(null);
                clearInterval(checkSpeechEnd);
            }
        }, 200);
    };

    // Load user's chat history list (all conversations)
    useEffect(() => {
        const loadUserChats = async () => {
            if (!user?.uid) return;
            
            try {
                // Query the chats collection for this user
                const chatsRef = collection(db, "users", user.uid, "chats");
                const q = query(chatsRef, orderBy("lastUpdated", "desc"));
                const querySnapshot = await getDocs(q);
                
                const chats = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title || "Untitled conversation",
                    lastUpdated: doc.data().lastUpdated?.toMillis() || Date.now()
                }));
                
                setUserChats(chats);
                
                // If this is the first time loading chats and we have no current chat ID
                if (chats.length > 0 && !currentChatId) {
                    // Set the most recent chat as current
                    setCurrentChatId(chats[0].id);
                    await loadChatHistory(chats[0].id);
                } else if (!currentChatId && chats.length === 0) {
                    // No chats exist yet, create a new one
                    createNewChat();
                }
            } catch (error) {
                console.error("Error loading user chats:", error);
            }
        };
        
        loadUserChats();
    }, [user?.uid]);

    // Function to create a new chat
    const createNewChat = async () => {
        console.log("createNewChat: Function called");
        if (!user?.uid) {
            console.log("createNewChat: No user ID, exiting");
            return;
        }
        
        // Show loading state immediately
        setIsLoadingHistory(true);
        setChatHistory([]); // Clear current history visually
        
        try {
            // Cancel any ongoing speech
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            
            // Reset typing state
            setIsTyping(false);
            setBotTypingText("");
            
            // Generate a unique ID for the new chat
            const newChatId = Date.now().toString();
            console.log("createNewChat: Generated new chat ID:", newChatId);
            
            // Prepare the welcome message
            const welcomeMessage = {
                type: "bot",
                text: "こんにちは！I'm your Japanese learning assistant. How can I help you today?",
                japanese: "こんにちは！",
                timestamp: Date.now()
            };
            
            // Create a new chat document in Firestore
            const chatRef = doc(db, "users", user.uid, "chats", newChatId);
            await setDoc(chatRef, {
                title: "New conversation",
                messages: [welcomeMessage], // Store the initial message here
                createdAt: serverTimestamp(),
                lastUpdated: serverTimestamp()
            });
            console.log("createNewChat: Saved new chat document to Firestore with welcome message");
            
            // Update userChats list state first
            setUserChats(prev => {
                const newChats = [{
                    id: newChatId,
                    title: "New conversation",
                    lastUpdated: Date.now()
                }, ...prev];
                console.log("createNewChat: Updated userChats state:", newChats);
                return newChats;
            });
            
            // Clear message input and search related states
            setMessage("");
            setSearchTerm("");
            setIsSearching(false);
            setSearchResults([]);
            console.log("createNewChat: Cleared input/search states");
            
            // Close chat history panel if open
            setShowChatHistory(false);
            
            // Set the currentChatId state LAST - this will trigger the useEffect hook
            setCurrentChatId(newChatId);
            console.log("createNewChat: Set currentChatId state to:", newChatId, " - useEffect will now load history.");
            
            // NOTE: We are NOT setting chatHistory here directly.
            // The useEffect hook watching currentChatId is responsible for loading.
            
            console.log("createNewChat: Finished successfully");
            
        } catch (error) {
            console.error("Error creating new chat:", error);
            setIsLoadingHistory(false); // Ensure loading state is turned off on error
        }
        // Loading state will be turned off by loadChatHistory called via useEffect
    };

    // Function to load a specific chat history
    const loadChatHistory = async (chatId: string) => {
        if (!user?.uid || !chatId) {
            console.log(`loadChatHistory: Missing uid or chatId. userId: ${user?.uid}, chatId: ${chatId}`);
            return;
        }
        
        console.log(`loadChatHistory: Starting to load chat ID: ${chatId}`);
        setIsLoadingHistory(true);
        
        try {
            const chatRef = doc(db, "users", user.uid, "chats", chatId);
            console.log(`loadChatHistory: Fetching document at path: users/${user.uid}/chats/${chatId}`);
            const chatDoc = await getDoc(chatRef);
            
            if (chatDoc.exists()) {
                console.log(`loadChatHistory: Chat document exists, has data:`, chatDoc.data());
                const chatData = chatDoc.data();
                
                // Set the current chat history from the loaded chat
                if (chatData.messages && Array.isArray(chatData.messages)) {
                    console.log(`loadChatHistory: Found ${chatData.messages.length} messages in chat`);
                    
                    // Important: First set current chat ID, then set history
                    setCurrentChatId(chatId);
                    setChatHistory(chatData.messages);
                    
                    // Update the chat's lastUpdated timestamp
                    await updateDoc(chatRef, {
                        lastUpdated: serverTimestamp()
                    });
                    
                    // Close chat history panel
                    setShowChatHistory(false);
                } else {
                    // If no messages exist, initialize with a welcome message
                    console.log(`loadChatHistory: No messages array found, initializing with welcome message`);
                    
                    // Initialize with a welcome message
                    const initialMessage = {
                        type: "bot",
                        text: "こんにちは！I'm your Japanese learning assistant. How can I help you today?",
                        japanese: "こんにちは！",
                        timestamp: Date.now()
                    };
                    
                    // First set the ID, then set history - order matters here
                    setCurrentChatId(chatId);
                    setChatHistory([initialMessage]);
                    
                    // Update the chat document with the initial message
                    await updateDoc(chatRef, {
                        messages: [initialMessage],
                        lastUpdated: serverTimestamp()
                    });
                    
                    // Close chat history panel
                    setShowChatHistory(false);
                }
            } else {
                console.error(`loadChatHistory: Chat document does not exist for ID: ${chatId}`);
                // Handle missing chat document case
                setChatHistory([{
                    type: "bot",
                    text: "Sorry, I couldn't find that conversation. Let's start a new one!",
                    japanese: "すみません！",
                    timestamp: Date.now()
                }]);
            }
        } catch (error) {
            console.error("Error loading chat history:", error);
            // Show error message in chat
            setChatHistory([{
                type: "bot",
                text: "Sorry, there was an error loading the chat history. Please try again.",
                japanese: "エラー！",
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoadingHistory(false);
            console.log(`loadChatHistory: Finished loading chat ID: ${chatId}`);
        }
    };

    // --- JSX Rendering ---
    console.log("Rendering Chat component with chatHistory:", chatHistory, "and currentChatId:", currentChatId); // Log state before render
    return (
        <Layout hideFooter={true}>
            {/* Add ref to the main container */}
            <div ref={pageContainerRef} className="section-container max-w-6xl mx-auto px-4 py-8 relative">
                {/* Background decoration elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 dark:bg-purple-950/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                     <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-100 dark:bg-pink-950/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    <div className="hidden md:block absolute bottom-1/4 right-1/3 w-32 h-32 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-2xl opacity-20 animate-blob animation-delay-3000"></div>
                    <div className="absolute top-10 left-10 text-8xl text-indigo-100 dark:text-indigo-950/30 font-bold opacity-20 japanese transform -rotate-12 animate-float">あ</div>
                    <div className="absolute bottom-10 right-10 text-8xl text-purple-100 dark:text-purple-950/30 font-bold opacity-20 japanese transform rotate-12 animate-float animation-delay-1000">い</div>
                </div>

                {/* Content */}
                <div className="text-center mb-8 relative z-10">
                    <h1 className="text-[33px] font-bold mb-2 font-['Poppins','Noto_Sans_JP',sans-serif] relative inline-block animate-fade-in-up bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                        N5 Ninja Learning Assistant
                    </h1>
                    <p className="text-[18px] mb-8 font-['Poppins','Noto_Sans_JP',sans-serif] max-w-3xl mx-auto animate-fade-in-up animation-delay-200 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent dark:from-gray-400 dark:to-gray-300">
                        {userName ? `Hello ${userName}! Ask anything about JLPT N5 Japanese!` : 'Ask anything about JLPT N5 Japanese grammar, vocabulary, or particles!'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">

                    {/* --- Sidebar --- */}
                    <div className="md:col-span-1">
                         <Card className="shadow-md h-full sticky top-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border dark:border-gray-700/50">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-lg">Quick Questions</CardTitle>
                                        <CardDescription>Tap to ask!</CardDescription>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="space-y-4">
                                                <h4 className="font-medium text-sm">Chat Settings</h4>
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="auto-speak" className="flex-1">Auto-speak responses</Label>
                                                    <Switch 
                                                        id="auto-speak" 
                                                        checked={autoSpeak}
                                                        onCheckedChange={setAutoSpeak}
                                                        className="data-[state=checked]:bg-indigo-500"
                                                    />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Label htmlFor="type-speed">Typing animation speed</Label>
                                                    <div className="flex items-center">
                                                        <span className="text-xs mr-2">Fast</span>
                                                        <input
                                                            id="type-speed"
                                                            type="range"
                                                            min="10"
                                                            max="100"
                                                            step="5"
                                                            value={typingSpeed}
                                                            onChange={(e) => setTypingSpeed(parseInt(e.target.value))}
                                                            className="flex-1 accent-indigo-500"
                                                        />
                                                        <span className="text-xs ml-2">Slow</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Label htmlFor="user-name">Your name</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input 
                                                            id="user-name"
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                            placeholder="Enter your name"
                                                        />
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => setUserName('')}
                                                            disabled={!userName}
                                                            className="shrink-0"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                                <Button onClick={() => setShowSettingsDialog(false)} className="w-full">
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Save Settings
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-0">
                                {suggestedQuestions.map((question, index) => (
                                    <TooltipProvider key={index} delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-left h-auto py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors truncate hover-scale border-gray-200 dark:border-gray-700"
                                                    onClick={() => handleSuggestedQuestion(question)}
                                                    disabled={isTyping}
                                                >
                                                    <Sparkles className="h-4 w-4 mr-2 flex-shrink-0 text-indigo-500" />
                                                    <span className="truncate">{question}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                <p>Ask: "{question}"</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full mt-4 text-red-500 hover:text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700/50 dark:hover:bg-red-950/30 hover-scale"
                                    onClick={clearChat}
                                    disabled={isTyping}
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Clear Chat
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --- Main Chat Area --- */}
                    <div className="md:col-span-3">
                         <Card className="shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[75vh] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/50 dark:to-purple-950/50 py-3 border-b dark:border-gray-700 flex-shrink-0 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Bot className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                N5 Ninja Assistant
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-6 w-6 ml-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-full"
                                                                onClick={() => setShowChatHistory(!showChatHistory)}
                                                            >
                                                                <History className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>View Chat History</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-6 w-6 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-full"
                                                                onClick={createNewChat}
                                                            >
                                                                <Plus className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>New Chat</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </CardTitle>
                                            <CardDescription className="text-xs">Powered by Gemini Flash</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`relative ${isSearching ? 'w-48 md:w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
                                            <Input 
                                                placeholder="Search messages..." 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleSearch();
                                                }}
                                                className="pr-8 h-8 text-sm"
                                            />
                                            {searchTerm && (
                                                <Button 
                                                    size="icon" 
                                                    variant="ghost" 
                                                    className="absolute right-0 top-0 h-8 w-8" 
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setSearchResults([]);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                        
                                        {isSearching && searchResults.length > 0 && (
                                            <div className="flex items-center gap-1 text-xs">
                                                <Button 
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={() => {
                                                        setCurrentSearchIndex(prev => 
                                                            prev > 0 ? prev - 1 : searchResults.length - 1
                                                        );
                                                    }}
                                                >
                                                    <ChevronDown className="h-3 w-3 rotate-180" />
                                                </Button>
                                                <span>
                                                    {currentSearchIndex + 1}/{searchResults.length}
                                                </span>
                                                <Button 
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={() => {
                                                        setCurrentSearchIndex(prev => 
                                                            prev < searchResults.length - 1 ? prev + 1 : 0
                                                        );
                                                    }}
                                                >
                                                        <ChevronDown className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                        
                                        <Button 
                                            size="icon"
                                            variant="outline"
                                            className={`h-8 w-8 ${isSearching ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}
                                            onClick={() => {
                                                setIsSearching(!isSearching);
                                                if (!isSearching) {
                                                    setTimeout(() => {
                                                        const input = document.querySelector('input[placeholder="Search messages..."]') as HTMLInputElement;
                                                        if (input) input.focus();
                                                    }, 100);
                                                } else {
                                                    setSearchTerm('');
                                                    setSearchResults([]);
                                                }
                                            }}
                                        >
                                            <Search className="h-4 w-4" />
                                        </Button>
                                        
                                        <Badge variant="outline" className="ml-auto bg-white/80 dark:bg-gray-800/80 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-0.5">
                                            {isTyping ? 'Typing...' : 'Online'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 flex-1 overflow-y-auto chat-messages-container" ref={chatMessagesRef}>
                                <div className="p-4 space-y-4 bg-gray-50/50 dark:bg-gray-950/30 chat-messages min-h-full">
                                    {chatHistory.map((chat, index) => {
                                        // Check if this message is in search results
                                        const searchResultIndex = searchResults.indexOf(index);
                                        const isSearchMatch = searchTerm && searchResultIndex > -1;
                                        const isCurrentSearchMatch = isSearchMatch && searchResultIndex === currentSearchIndex;
                                        
                                        return (
                                            <div
                                                key={index}
                                                data-type={chat.type}
                                                className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"} message-animation group`}
                                                ref={isSearchMatch ? (el) => {
                                                    searchResultRefs.current[searchResultIndex] = el;
                                                } : undefined}
                                            >
                                                <div
                                                    className={`relative p-3 rounded-lg max-w-[85%] shadow-sm flex flex-col 
                                                        ${chat.type === "user"
                                                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                                                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                                        }
                                                        ${isCurrentSearchMatch ? "ring-2 ring-yellow-400 dark:ring-yellow-600" : ""}
                                                        ${isSearchMatch && !isCurrentSearchMatch ? "ring-1 ring-yellow-300 dark:ring-yellow-700" : ""}
                                                    `}
                                                >
                                                    {/* Bot Japanese Header */}
                                                    {chat.type === "bot" && chat.japanese && (
                                                        <div className="text-sm font-medium mb-2 japanese text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md self-start border border-indigo-200 dark:border-indigo-800">
                                                            {chat.japanese}
                                                        </div>
                                                    )}

                                                    {/* Main Content Area (Text Only) */}
                                                    <div className="flex items-start text-sm">
                                                        {chat.type === "bot" && (
                                                            <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                                                        )}
                                                        <div className="whitespace-pre-wrap break-words flex-1">
                                                            {chat.text}
                                                            
                                                            {/* Timestamp */}
                                                            <div className={`mt-1 text-xs opacity-0 group-hover:opacity-70 transition-opacity duration-200
                                                                ${chat.type === "user" ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}
                                                            `}>
                                                                {formatTimestamp(chat.timestamp)}
                                                            </div>
                                                        </div>
                                                        {chat.type === "user" && (
                                                            <User className="h-4 w-4 ml-2 mt-0.5 flex-shrink-0 text-indigo-100 opacity-80" />
                                                        )}
                                                    </div>

                                                    {/* Add speaker button for bot messages only */}
                                                    {chat.type === "bot" && (
                                                        <div className="flex justify-end mt-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleSpeakMessage(index, chat.text)}
                                                                className="h-7 w-7 p-0 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                                                title={speakingMessageIndex === index ? "Stop speaking" : "Listen to this response"}
                                                            >
                                                                {speakingMessageIndex === index ? (
                                                                    <VolumeX className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                                ) : (
                                                                    <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Typing Indicator with animated text */}
                                    {isTyping && (
                                        <div data-type="typing" className="flex justify-start mb-4 message-animation">
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm rounded-bl-none inline-flex items-start">
                                                <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                                                <div className="whitespace-pre-wrap break-words">
                                                    {botTypingText}
                                                    <div className="inline-flex items-center">
                                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-subtle-bounce"></div>
                                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-subtle-bounce ml-1" style={{ animationDelay: '0.2s' }}></div>
                                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-subtle-bounce ml-1" style={{ animationDelay: '0.4s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} className="h-1" />
                                </div>
                            </CardContent>

                            {/* Message input form */}
                            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
                                <Input
                                    ref={inputRef}
                                    placeholder={isListening ? "Listening..." : "Ask about N5 Japanese..."}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-1 mr-2 focus-visible:ring-indigo-500 chat-input text-sm bg-white dark:bg-gray-700/50"
                                    disabled={isTyping}
                                    aria-label="Chat message input"
                                />
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                onClick={() => setShowVoiceModal(true)}
                                                disabled={isTyping}
                                                size="icon"
                                                variant="outline"
                                                className="mr-2 border-gray-300 dark:border-gray-600 hover-scale text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                aria-label="Voice Assistant"
                                            >
                                                <Mic className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Open Voice Assistant</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="submit"
                                                disabled={!message.trim() || isTyping || isListening}
                                                size="icon"
                                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover-scale"
                                                aria-label="Send message"
                                            >
                                                <SendIcon className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Send message</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </form>
                        </Card>
                    </div>
                </div>

                {/* Styles */}
                <style>{`
                  .japanese { font-family: 'Noto Sans JP', sans-serif; }
                  .chat-messages-container::-webkit-scrollbar { width: 8px; }
                  .chat-messages-container::-webkit-scrollbar-track { background: transparent; }
                  .chat-messages-container::-webkit-scrollbar-thumb { background: rgba(129, 140, 248, 0.4); border-radius: 10px; border: 2px solid transparent; background-clip: padding-box; }
                  .chat-messages-container::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.6); }
                  .chat-messages-container { scrollbar-width: thin; scrollbar-color: rgba(129, 140, 248, 0.4) transparent; }
                  @keyframes slideFadeInUser { from { opacity: 0; transform: translateX(15px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
                  @keyframes slideFadeInBot { from { opacity: 0; transform: translateX(-15px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
                  .message-animation[data-type="user"] { animation: slideFadeInUser 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                  .message-animation[data-type="bot"], .message-animation[data-type="typing"] { animation: slideFadeInBot 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                  @keyframes subtleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
                  .animate-subtle-bounce { animation: subtleBounce 1.2s infinite ease-in-out; }
                  .chat-input:focus-visible { box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); border-color: rgb(129 140 248); transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out; }
                  @keyframes blob { 0% { transform: translate(0px, 0px) scale(1) rotate(0deg); filter: blur(48px); } 33% { transform: translate(40px, -60px) scale(1.15) rotate(15deg); filter: blur(56px); } 66% { transform: translate(-30px, 30px) scale(0.85) rotate(-10deg); filter: blur(40px); } 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); filter: blur(48px); } }
                  .animate-blob { animation: blob 25s infinite alternate ease-in-out; will-change: transform, filter; }
                  @keyframes float { 0% { transform: translateY(0px) rotate(-12deg); opacity: 0.15; } 50% { transform: translateY(-20px) rotate(-7deg) scale(1.05); opacity: 0.25; } 100% { transform: translateY(0px) rotate(-12deg); opacity: 0.15; }
                  }
                  .animate-float { animation: float 22s ease-in-out infinite alternate; will-change: transform, opacity; }
                  .animate-float.animation-delay-1000 { transform: rotate(12deg); animation-delay: 1.5s; }
                  .hover-scale { transition: transform 0.15s ease-out; }
                  .hover-scale:not(:disabled):hover { transform: scale(1.05); }
                  .hover-scale:not(:disabled):active { transform: scale(0.97); }
                  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                  .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; will-change: transform, opacity; }
                  .animation-delay-200 { animation-delay: 0.2s; }
                  .animation-delay-1000 { animation-delay: 1s; }
                  .animation-delay-2000 { animation-delay: 2s; }
                  .animation-delay-3000 { animation-delay: 3s; }
                  .animation-delay-4000 { animation-delay: 4s; }
                  .section-container { position: relative; }
                `}</style>
            </div>

            {/* User Name Prompt Dialog */}
            <AlertDialog open={showNamePrompt}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Welcome to N5 Ninja Chat!</AlertDialogTitle>
                        <AlertDialogDescription>
                            What should I call you? Entering your name helps me personalize your experience.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Input 
                            value={userNameInput}
                            onChange={(e) => setUserNameInput(e.target.value)}
                            placeholder="Enter your name (optional)"
                            className="w-full"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleNameSubmit();
                            }}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowNamePrompt(false)}>Skip</AlertDialogCancel>
                        <AlertDialogAction onClick={handleNameSubmit}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Clear Chat Confirmation Dialog */}
            <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to clear all chat messages? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmClearChat} className="bg-red-600 hover:bg-red-700">
                            Clear All Messages
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Voice Assistant Modal */}
            {showVoiceModal && (
                <VoiceAssistantModal
                    onClose={() => {
                        // Cancel speech when closing the modal
                        if (typeof window !== 'undefined' && window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                        }
                        setShowVoiceModal(false);
                    }}
                    onSendVoiceMessage={handleVoiceMessage}
                    isTyping={isTyping}
                />
            )}

            {/* Chat History Sidebar Panel */}
            {showChatHistory && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex">
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-lg animate-slide-in-right overflow-hidden flex flex-col">
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-b dark:border-gray-700 flex items-center justify-between">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                <History className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                Chat History
                            </h3>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => setShowChatHistory(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button
                            className="m-3 gap-2"
                            onClick={createNewChat}
                        >
                            <Plus className="h-4 w-4" />
                            New Chat
                        </Button>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {userChats.map((chat) => (
                                <div 
                                    key={chat.id} 
                                    className={`
                                        p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors group
                                        ${currentChatId === chat.id 
                                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200' 
                                            : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}
                                        border ${currentChatId === chat.id 
                                            ? 'border-indigo-300 dark:border-indigo-700' 
                                            : 'border-gray-200 dark:border-gray-700'}
                                    `}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentChatId !== chat.id) {
                                            console.log(`Clicked to load chat: ${chat.id}`);
                                            loadChatHistory(chat.id);
                                        } else {
                                            console.log(`Current chat already active: ${chat.id}`);
                                            setShowChatHistory(false);
                                        }
                                    }}
                                >
                                    <Bot className="h-5 w-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{chat.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(chat.lastUpdated).toLocaleDateString()}</p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Add delete chat functionality
                                        }}
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {userChats.length === 0 && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <p>No chat history yet.</p>
                                    <p className="text-sm">Start a new chat to begin!</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setShowChatHistory(false)}
                    ></div>
                </div>
            )}
        </Layout>
    );
};

export default Chat;