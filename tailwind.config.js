/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Noto Sans JP', 'sans-serif'],
        japanese: ['Noto Sans JP', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)"
        },
        // Traditional Japanese color palette
        akane: {
          light: '#FF9E9E',  // Lighter red
          DEFAULT: '#D22630', // Akane (Deep Red)
          dark: '#A91E24',   // Darker red
        },
        kon: {
          light: '#5A75B0',  // Lighter indigo
          DEFAULT: '#2D4B9A', // Kon (Deep Indigo)
          dark: '#1A2F66',   // Darker indigo
        },
        asagi: {
          light: '#B2D7E5',  // Lighter blue
          DEFAULT: '#7DB9CB', // Asagi (Light Blue)
          dark: '#4D93AA',   // Darker blue
        },
        moegi: {
          light: '#A5CE93',  // Lighter yellow-green
          DEFAULT: '#86B06B', // Moegi (Yellow-green)
          dark: '#5A8241',   // Darker yellow-green
        },
        sakura: {
          light: '#FFDBED',  // Lighter pink
          DEFAULT: '#FBBFCA', // Sakura (Cherry Blossom)
          dark: '#F687A8',   // Darker pink
        },
        kachi: {
          light: '#2D3B55',  // Lighter navy
          DEFAULT: '#1F2A3E', // Kachi (Deep Navy)
          dark: '#131A27',   // Darker navy
        },
        washi: {
          light: '#F9F8F3',  // Washi paper - very light cream
          DEFAULT: '#F0EDE4', // Washi paper - cream
          dark: '#E5E1D3',   // Washi paper - darker cream
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        themeToggle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        shine: {
          "0%": { backgroundPosition: "0% 0%" },
          "33%": { backgroundPosition: "100% 100%" },
          "66%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" }
        },
        "aurora-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "theme-toggle": "themeToggle 0.5s ease-in-out",
        "shine": "shine var(--duration, 14s) infinite ease-in-out",
        "aurora-flow": "aurora-flow var(--duration, 8s) infinite ease-in-out"
      }
    },
  },
  plugins: [require("tailwindcss-animate")]
}

