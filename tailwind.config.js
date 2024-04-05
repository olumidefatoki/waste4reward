/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    width: {
      rdash: "calc(100vw - 280px)",
      ldash: "calc(100vw - 80px)",
      full: "100%",
      portal: "100vh",
      modal: "38rem",
    },
    minHeight: {
      pfPage: "calc(100vh - 90px)",
      full: "100%",
      portal: "100vh",
      modal: "38rem",
    },
    backgroundImage: {
      "hero-pattern": "url('/src/assets/images/bg-1.jpg')",
      // "footer-texture": "url('/img/footer-texture.png')",
    },
  },
  plugins: [],
};
