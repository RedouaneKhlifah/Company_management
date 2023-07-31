import PropTypes from "prop-types";

const sizes = {
    none: "",
    xs: "w-6 h-6 min-w-[24px] min-h-[24px] ring-1",
    sm: "w-9 h-9 min-w-[36px] min-h-[36px] ring-1",
    md: "w-12 h-12 min-w-[48px] min-h-[48px] ring-1",
    lg: "w-16 h-16 min-w-[64px] min-h-[64px] ring-2",
    xl: "w-20 h-20 min-w-[80px] min-h-[80px] ring-2",
    xxl: "w-28 h-28 min-w-[112px] min-h-[112px] ring-2",
    xxxl: "w-36 h-36 min-w-[144px] min-h-[144px] ring-2"
};

export default function Avatar({
    size = "none",
    alt = "Avatar",
    src,
    className = ""
}) {
    return (
        <picture>
            <img
                src={src}
                alt={alt}
                className={`${sizes[size]} rounded-full object-cover ring-anep-secondary drop-shadow-black-sm ${className}`}
            />
        </picture>
    );
}

Avatar.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes))
};
