module.exports = {
  // mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts}"],
    options: {
      safelist: [/data-theme$/],
    },
  },
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
