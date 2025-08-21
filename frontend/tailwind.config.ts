import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'selector', // Changed from 'class' to 'selector' in v4
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config