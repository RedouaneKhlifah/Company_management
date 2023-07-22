import { Button } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import "../../assets/css/style.css";

const colorsPreset = {
    blue: "anep-btn-primary",
    gray: "anep-btn-secondary",
    red: "anep-btn-danger"
}
const hoverColorsPreset = {
    blue: "blue",
    gray: "blue-gray",
    red: "red"
}

function ANEPBtn({ name, type = "submit", icon, color = "blue", className = "" }) {
    return (
        <Button
            type={type}
            size="sm"
            color={hoverColorsPreset[color]}
            className={`${colorsPreset[color]} ${className} text-base md:text-lg md:px-5 md:py-2.5 font-cairo flex items-center gap-x-3 normal-case`}
        >
            {icon ? <Icon icon={icon} className="text-xl md:text-2xl" /> : ""}
            {name}
        </Button>
    );
}

ANEPBtn.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colorsPreset))
}

export default ANEPBtn;
