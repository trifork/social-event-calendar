import type { Config } from 'tailwindcss';

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: '670px'
    },
    extend: {
      colors: {
        primary: {
          100: "#F5EBE4",
          500: "#FF6600",
          900: "#2C3A42" 
        },
        neutral: {
          0: "#FFFFFF",
          50: "#F4F5F6",
          100: "#DFE1E3",
          200: "#D5D8D9",
          300: "#ABB0B3",
          400: "#80898E",
          500: "#566168",
          600: "#4C585E",
          700: "#37444B",
          800: "#2C3A42",
        }
      },

    },
  },
  plugins: [],
} satisfies Config;

