/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/**/*.stories.{ts,tsx}",
    "./src/components/**/*.ts",
    "./src/utils/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3490dc',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#e3342f',
          foreground: '#ffffff',
        },
        ring: '#3490dc',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['peer-focus'],
      textColor: ['peer-focus'],
      translate: ['peer-focus', 'peer-placeholder-shown'],
      scale: ['peer-focus', 'peer-placeholder-shown'],
    }
  },
  plugins: [],
};
