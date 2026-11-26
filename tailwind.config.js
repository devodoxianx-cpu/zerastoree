/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zera: {
          bg: "#0A0B0E",
          surface: "#12141A",
          card: "#181B24",
          hover: "#222736",
          yellow: "#FFE600",
          "yellow-hover": "#FFF04B",
          gold: "#F59E0B",
          "gold-hover": "#FBBF24",
          // Aliases to bright yellow for compatibility
          cyan: "#FFE600",
          "cyan-hover": "#FFF04B",
          blue: "#F59E0B",
          "blue-hover": "#FBBF24",
          white: "#F5F7FA",
          muted: "#A1A7B4",
          border: "#282B36",
          borderLight: "#383E4E",
        }
      },
      boxShadow: {
        'yellow-sm': '0 0 10px rgba(255, 230, 0, 0.25)',
        'yellow-md': '0 0 20px rgba(255, 230, 0, 0.4)',
        'yellow-lg': '0 0 35px rgba(255, 230, 0, 0.6)',
        'cyan-sm': '0 0 10px rgba(255, 230, 0, 0.25)',
        'cyan-md': '0 0 20px rgba(255, 230, 0, 0.4)',
        'cyan-lg': '0 0 35px rgba(255, 230, 0, 0.6)',
        'blue-sm': '0 0 10px rgba(245, 158, 11, 0.25)',
      },
      fontFamily: {
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
        gaming: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
