/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import plugin from "tailwindcss/plugin";

export default withMT({
    mode: "jit",
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
                "anep-primary-light": "#046a9f",
                "anep-primary-dark": "#03496d",
                "anep-secondary": "#edf2f9",
                "anep-light": "#d9e3ec",
                "anep-dark": "#303030"
            },
            fontFamily: {
                cairo: ["Cairo", "sans-serif"]
            },
            dropShadow: {
                "black-sm": ["0 2px 4px rgb(0 0 0 / 0.5)"],
                "white-custom": ["0 0px 4px rgb(255 255 255)"]
            },
            boxShadow: {
                "anep-primary-inset":
                    "inset 5px 5px 10px #023149, inset -5px -5px 10px #0471a9"
            },
            screens: {
                "sm-max": { max: "639px" },
                "md-max": { max: "767px" },
                "lg-max": { max: "1023px" },
                "xl-max": { max: "1279px" },
                "2xl-max": { max: "1535px" },
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px"
            }
        }
    },
    plugins: [
        require("flowbite/plugin"),
        require("tailwind-scrollbar"),
        plugin(function ({ addVariant }) {
            addVariant("child", "&>*");
            addVariant("child-hover", "&>*:hover");
            addVariant("child-focus", "&>*:focus");
            addVariant("child-active", "&>*:active");
        })
    ]
});
