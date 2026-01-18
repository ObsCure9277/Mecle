/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            // Neumorphic base surfaces
            'surface-light': '#E0E0E0',
            'surface-dark': '#1A1A1A',

            // LED feedback colors
            'led-green': '#00FF88',
            'led-amber': '#FFB800',
            'led-gray': '#4A4A4A',

            // Console accent colors
            'metal-light': '#F5F5F5',
            'metal-dark': '#2A2A2A',
         },
         fontFamily: {
            'display': ['Orbitron', 'monospace'],
            'body': ['Inter', 'sans-serif'],
         },
         boxShadow: {
            // Neumorphic shadows for raised elements
            'neu-light': '8px 8px 16px rgba(0,0,0,0.2), -8px -8px 16px rgba(255,255,255,0.7)',
            'neu-light-sm': '4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.6)',

            // Neumorphic shadows for dark mode
            'neu-dark': '8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.05)',
            'neu-dark-sm': '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.03)',

            // Inset shadows for pressed/sunken elements
            'neu-inset-light': 'inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.7)',
            'neu-inset-dark': 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.05)',
         },
      },
   },
   plugins: [],
}
