/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors:{
        Primary: '#44f249',
        Secondary: '#84ff7b',
        white:'#ffffff',
        darkPrimary:'#0f172a',
        // darkPrimary:'#2E3144',
        black:'#000000',
        // red:'#8B0000',
        'zinc':{
          50:'#f8fafc',
          100:'#f1f5f9',
          200:'#e2e8f0',
          300:'#cbd5e1',
          400:'#94a3b8',
          500:'#64748b',
          600:'#475569',
          700:'#334155',
          800:'#1e293b',
          900:'#0f172a',
          950:'#020617',
        },
        'red':{
          50:'#fef2f2',
          100:'#fee2e2',
          200:'#fecaca',
          300:'#fca5a5',
          400:'#f87171',
          500:'#ef4444',
          600:'#dc2626',
          700:'#b91c1c',
          800:'#991b1b',
          900:'#7f1d1d',
          950:'#450a0a',
        }
      },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}