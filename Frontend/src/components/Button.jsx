import React from "react";

function Button({ title, bg, textColor, textSize, rounded, padding }) {
    return (
        <div>
            <button
                className={`bg-${bg} text-${textColor} text-${textSize} rounded-${rounded} p-${padding}  `}
            >
                {title}
            </button>
        </div>
    );
}

export default Button;
