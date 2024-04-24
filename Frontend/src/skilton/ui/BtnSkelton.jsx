import React from "react";
import { Button } from "@material-tailwind/react";


function BtnSkelton() {
    return (
        <Button
            size="lg"
            color={'bg-gray-200'}
            className={`bg-gray-200  w-24  `}
        >
        </Button>
    );
}

export default BtnSkelton;

