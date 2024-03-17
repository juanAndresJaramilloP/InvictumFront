/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-img1': "url('/src/assets/home1.png')",
        'home-img2': "url('/src/assets/home2.png')",
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["corporate", "forest", "synthwave","luxury"],
  },
}

