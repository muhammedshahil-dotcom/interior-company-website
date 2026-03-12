/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {animation: {
    marquee1: "marquee1 35s linear infinite",
    marquee2: "marquee2 35s linear infinite",
  },
  keyframes: {
    marquee1: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
    marquee2: {
      "0%": { transform: "translateX(-50%)" },
      "100%": { transform: "translateX(0)" },
    },
  },},
  },
  plugins: [],
  
  
}