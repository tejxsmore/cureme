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
        dark: "#283739",
        grey: "#BBBFCA",
        white: "#FFFFFF",
        black: "#040D12",
        red: "#D80032",
      },
    },
  },
  plugins: [],
};
