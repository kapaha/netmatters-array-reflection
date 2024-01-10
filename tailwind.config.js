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
            screens: {
                desktop: {
                    raw: "only screen and (min-width: 1024px) and (min-height: 500px)",
                },
                wide: {
                    raw: "only screen and (max-height: 500px)",
                },
            },
            gridTemplateColumns: {
                gallery: "repeat(auto-fill, minmax(min(150px, 100%), 1fr))",
            },
        },
    },
    plugins: [],
};
