import { Disclosure } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/solid";
import ANEPBtn from "./utils/ANEPBtn";
import SearchButton from "./utils/SearchButton";
import Sort from "./utils/Sort";



const NavFilter = ({
    sortOptions,
    sendSortSearchDataToParent
}) => {
        const handleSortOptionChange = (optionValue) => {
            sendSortSearchDataToParent((prv)=>({
                ...prv,
                sort : optionValue
            }))
        };

        const handleDataSearch = (value) => {
            sendSortSearchDataToParent((prv)=>({
                ...prv,
                search : value
            }))
        };

    return (
        <>
            <nav className="px-4 py-3 bg-anep-secondary mt-6 rounded-md drop-shadow-md" style={{ zIndex: 100 }}>
                <Disclosure
                    as="section"
                    aria-labelledby="filter-heading"
                    className="relative z-10 flex items-center justify-between  "
                >
                    {/* Search */}
                        <form className=" max-w-7xl  ">
                            <div className="relative pointer-events-auto">
                                <SearchButton
                                    label="Rechercher par emploi"
                                    typeInput="text"
                                    size="lg"
                                    classNameInput="focus:ring-0 min-w-[300px] pr-20 bg-white rounded-4"
                                    typeButton="button"
                                    icon="material-symbols:search-rounded"
                                    classNameButton="!absolute right-0.5 top-0.5 scale-95"
                                    sendSearchToParent={handleDataSearch}
                                />
                            </div>
                        </form>
                    {/* Sorting */}
                        <div className=" z-0 pointer-events-auto" style={{ zIndex: 100 }}>
                            <Sort
                                sortOptions={sortOptions}
                                onSortOptionChange={handleSortOptionChange}
                            />
                                
                        </div>
                    {/* Add employee button */}
                        <ANEPBtn
                            name="Add a new employee"
                            color="blue"
                            className="pointer-events-auto"
                        />
                </Disclosure>
            </nav>
        </>
    );
};

export default NavFilter;
