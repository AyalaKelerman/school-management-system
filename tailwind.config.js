// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fecaca",       // אדום בהיר מאוד (כמו ורוד עדין)
        primaryDark: "#f87171",   // אדום רך וברור
        secondary: "#fff1f2",     // רקע כמעט לבן עם נגיעת אדום
        header: "#991b1b",        // אדום כהה לטקסט חשוב
        tableBorder: "#fcdcdc",   // גבולות טבלה עדינים באדום
      },
    }
  },
  plugins: [],
};
