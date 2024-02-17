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
        white: "#FFFFFF",
        red: "#D80032",
        black: "#040D12",

        dark: "#2C2955",
        blue: "#4C5FB1",
        yellow: "#F9F194",
      },
    },
  },
  plugins: [],
};
