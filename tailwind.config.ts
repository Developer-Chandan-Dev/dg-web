// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ["var(--font-poppins)", "sans-serif"],     // ⬅️ new default
                // mono: ["var(--font-geist-mono)", "monospace"],    // keep if you still use Geist Mono
            },
            animation: {
                'pulse-gradient': 'pulseGradient 6s ease-in-out infinite',
                float: 'float 10s ease-in-out infinite',
            },
            keyframes: {
                pulseGradient: {
                    '0%, 100%': {'--spacing': '62px'},
                    '50%': {'--spacing': '500px'},
                },
                float: {
                    '0%': {transform: 'translateY(0) translateX(0)'},
                    '50%': {transform: 'translateY(-200px) translateX(-20px)'},
                    '100%': {transform: 'translateY(-400px) translateX(20px)'},
                }
            },
            boxShadow: {
                'glow-cyan': '0px 0px 25px cyan',
            },
        },
    },
    plugins: [],
}
