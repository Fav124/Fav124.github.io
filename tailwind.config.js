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
                    DEFAULT: '#0B63D6',
                    dark: '#084bb0',
                },
                accent: '#10B981',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'morphing': 'morphing 15s infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                morphing: {
                    '0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                    '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
                    '50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
                    '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
