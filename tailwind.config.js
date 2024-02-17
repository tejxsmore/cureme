/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        dark: "#2C2955",
        white: "#FFFFFF",
        black: "#040D12",
        blue: "#4C5FB1",
        red: "#D80032",
        yellow: "#F9F194",
      },
    },
  },
  plugins: [],
};
