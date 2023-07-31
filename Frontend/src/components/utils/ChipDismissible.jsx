import React from "react";
import { Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";

function ChipDismissible({ value, id, onclose }) {
    return (
        <>
            <Chip
                className="py-2 px-3 whitespace-normal truncate text-[10px]"
                open={true}
                value={value}
                onClose={() => onclose(id)}
            />
        </>
    );
}

export default ChipDismissible;
