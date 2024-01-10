/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
        extend: {
            height: {
                "dynamic-screen": ["100vh", "100dvh"],
            },
            animation: {
                "spin-slow": "spin 2s linear infinite",
            },
        },
    },
    plugins: [],
};
