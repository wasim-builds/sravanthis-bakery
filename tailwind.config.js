/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          burgundy: "#56150E",
          burgundyDark: "#3A110C",
          burgundyDeep: "#451402",
          cream: "#F1DBBB",
          creamLight: "#FCF7F0",
          creamWarm: "#F8F0E5",
          crust: "#8B4513",
          amber: "#C86A24",
          gold: "#D4AF37",
          goldBright: "#E6CA65",
          espresso: "#24140E",
          whatsapp: "#25D366"
        }
      },
      fontFamily: {
        signika: ['"Signika"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif']
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(86, 21, 14, 0.08), 0 2px 6px -1px rgba(86, 21, 14, 0.04)',
        'warm-hover': '0 10px 25px -3px rgba(86, 21, 14, 0.15), 0 4px 10px -2px rgba(86, 21, 14, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
