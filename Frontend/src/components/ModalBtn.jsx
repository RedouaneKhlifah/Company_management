import React from "react";
import Modal from "./modals/modal";
import PropTypes from "prop-types";

function ModalBtn({
    url,
    Inputes = [],
    autocompleteInpute,
    className = "",
    name = "",
    icon = ""
}) {
    console.log(Inputes);
    return (
        <>
            <Modal
                url={url}
                Inputes={Inputes}
                autocompleteInpute={autocompleteInpute}
                className={className}
                name={name}
                icon={icon}
            />
        </>
    );
}

export default ModalBtn;
