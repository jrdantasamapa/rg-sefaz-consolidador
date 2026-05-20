/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8f4",
          100: "#d7f0e6",
          500: "#1f8a5b",
          600: "#176e49",
          700: "#14583d",
          900: "#0d3225"
        },
        ink: "#17211b"
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: [],
};
