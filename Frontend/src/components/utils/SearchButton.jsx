import ANEPBtn from "./ANEPBtn";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { GlobalVariables } from "../../App";

function SearchButton({
    url = "api/emplois",
    label,
    typeInput,
    size,
    classNameInput,
    typeButton,
    icon,
    classNameButton,
    sendSearchToParent // Make sure these props are passed correctly
}) {
    const { backendURL } = useContext(GlobalVariables);
    const [search, setSearch] = useState("");
    // const [first, setFirst] = useState(true);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearch(value);
    };

    const handleClickChange = () => {
        sendSearchToParent(search)
    };

    return (
        <>
            <Input
                label={label}
                type={typeInput}
                size={size}
                className={classNameInput}
                onChange={handleInputChange}
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
