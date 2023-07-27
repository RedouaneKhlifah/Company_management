import React from "react";
import { Chip, Button } from "@material-tailwind/react";

export function ChipDismissible({ value, id, onclose }) {
    return (
        <>
            <Chip
                className=" whitespace-normal truncate text-[8px] "
                open={true}
                value={value}
                onClose={() => onclose(id)}
            />
        </>
    );
}
