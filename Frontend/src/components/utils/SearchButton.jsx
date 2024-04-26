import ANEPBtn from "./ANEPBtn";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { GlobalVariables } from "../../App";

function SearchButton({
    label,
    typeInput,
    size,
    classNameInput,
    typeButton,
    icon,
    classNameButton,
    sendSearchToParent
}) {
    const [search, setSearch] = useState("");

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearch(value);
    };

    const handleClickChange = () => {
        sendSearchToParent(search)
    };

    const handleKeyDown = (event) => {     
        if (event.key === "Enter") {
            event.preventDefault();
            sendSearchToParent(search);
        }
    };
    return (
        <>
            <Input
                label={label}
                type={typeInput}
                size={size}
                className={ `${classNameInput}`}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <ANEPBtn
                type={typeButton}
                icon={icon}
                className={classNameButton}
                onClick={handleClickChange}
            />
        </>
    );
}

export default SearchButton;
