// src/lib/readingTypes.ts

export type VocabularyItem = {
    word: string;
    reading: string;
    meaning: string;
};

export type Question = {
    id: string;
    question: string;
    question_en?: string;
    options: string[];
    options_en?: string[];
    answer: number;
    explanation?: string;
};

export type ReadingExercise = {
    id: string;
    title: string;
    level: string; // e.g., N5, N4, N3
    levelDescription: string; // e.g., Beginner, Intermediate
    text: string;
    translation: string;
    vocabulary: VocabularyItem[];
    questions: Question[];
}; 