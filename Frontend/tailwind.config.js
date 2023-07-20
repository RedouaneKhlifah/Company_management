/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import plugin from "tailwindcss/plugin";
 
export default withMT({
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                "anep-yellow": "#ffd200",
                "anep-light-blue": "#58affc",
                "anep-primary": "#035179",
                "anep-secondary": "#edf2f9",
                "anep-light": "#d9e3ec",
                "anep-dark": "#303030",
            },
            fontFamily: {
                "cairo": ["Cairo", "sans-serif"]
            }
        }
    },
    plugins: [
        require("flowbite/plugin"),
        plugin(function({ addVariant }) {
            addVariant('child', '&>*');
            addVariant('child-hover', '&>*:hover');
            addVariant('child-focus', '&>*:focus');
            addVariant('child-active', '&>*:active');
        })
    ]
});
