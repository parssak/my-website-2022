module.exports = {
  content: ["./src/**/*.{js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "6rem",
          xl: "12rem",
        },
        center: true,
      },
      keyframes: {
        hueshift: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin 50s linear infinite",
        hueshift: "hueshift 20s linear infinite",
      },
    },
  },
  plugins: [],
};
