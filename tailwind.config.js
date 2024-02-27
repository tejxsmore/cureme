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
        dark: "#070F2B",
        light: "#FEFBF6",
        blue: "#9290C3",
      },
    },
  },
  plugins: [],
};
