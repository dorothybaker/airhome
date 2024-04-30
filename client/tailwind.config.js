/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#FF385C",
      },
      backgroundColor: {
        primary: "#FF385C",
      },
    },
  },
  plugins: [],
};
