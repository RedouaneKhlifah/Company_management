/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                anepBlue: "#075985",
                lighterGray: "#EDF2F9",
                "anep-primary": "#035179",
                "anep-secondary": "#edf2f9",
                lineGray: "rgba(0, 0, 0, 0.3)"
            }
        }
    },
    plugins: [require("flowbite/plugin")]
};
