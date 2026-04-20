/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6ebff',
          200: '#cdd8ff',
          300: '#a6b4ff',
          400: '#7a87ff',
          500: '#5563ff',
          600: '#3d47f5',
          700: '#0033a0',
          800: '#002370',
          900: '#001850',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fce89a',
          300: '#fad94d',
          400: '#f3c200',
          500: '#e6a400',
          600: '#ca8a00',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        'xl': '12px',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
