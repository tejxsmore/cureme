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
        dark: "#2C2E3E",
        light: "#F6F6F6",
        mild: "#34374C",
        gray: "#EEEDEB",
        blue: "#3F52E3",
        red: "#EE2B47",
      },
    },
  },
  plugins: [],
};
