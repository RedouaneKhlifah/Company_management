import ANEPBtn from "./utils/ANEPBtn";
import ANEPFilter from "./utils/ANEPFilter";
import ANEPTri from "./utils/ANEPTri";
import { Input } from "@material-tailwind/react";

function AllFilters({ onInputChange, onSortOptionChange , selectedSortOption }) {
    const handleInputChange = (event) => {
        const { value } = event.target;
        onInputChange(value); // Call the callback function with the updated input value
    };
    return (
        <>
            <div className="flex justify-between items-start m-1.5 rounded-lg mt-3 drop-shadow-md bg-anep-secondary">
                <div className="m-5  ">
                    {/* <input type="text" name="" id="" /> */}
                    {/* <ANEPFilter/> */}
                    <div className="flex">
                        <ANEPFilter />
                        <ANEPTri
                            onSortOptionChange={onSortOptionChange}
                            selectedSortOption={selectedSortOption}
                        />
                    </div>
                </div>
                <div className="m-5">
                    <Input
                        label="Recherche"
                        type="text"
                        size="md"
                        className="focus:ring-0"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="m-5">
                    <ANEPBtn name="Ajouter un nouvel emploi" />
                </div>
            </div>
        </>
    );
}
export default AllFilters;
