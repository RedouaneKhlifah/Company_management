import { Disclosure } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/solid";
import ANEPBtn from "./utils/ANEPBtn";
import SearchButton from "./utils/SearchButton";
import Sort from "./utils/Sort";

const NavFilter = ({
    sendSearchToParent,
    sendSortToParent,
    onSortOptionChange,
    sortOptions
}) => {
    const filters = {
        price: [
            { value: "0", label: "$0 - $25", checked: false },
            { value: "25", label: "$25 - $50", checked: false },
            { value: "50", label: "$50 - $75", checked: false },
            { value: "75", label: "$75+", checked: false }
        ],
        color: [
            { value: "white", label: "White", checked: false },
            { value: "beige", label: "Beige", checked: false },
            { value: "blue", label: "Blue", checked: true },
            { value: "brown", label: "Brown", checked: false },
            { value: "green", label: "Green", checked: false },
            { value: "purple", label: "Purple", checked: false }
        ],
        size: [
            { value: "xs", label: "XS", checked: false },
            { value: "s", label: "S", checked: true },
            { value: "m", label: "M", checked: false },
            { value: "l", label: "L", checked: false },
            { value: "xl", label: "XL", checked: false },
            { value: "2xl", label: "2XL", checked: false }
        ],
        category: [
            {
                value: "all-new-arrivals",
                label: "All New Arrivals",
                checked: false
            },
            { value: "tees", label: "Tees", checked: false },
            { value: "objects", label: "Objects", checked: false },
            { value: "sweatshirts", label: "Sweatshirts", checked: false },
            {
                value: "pants-and-shorts",
                label: "Pants & Shorts",
                checked: false
            }
        ]
    };

    // sendDataToParent = {};
    return (
        <>
            <nav className="px-4 py-2 bg-anep-secondary mt-6 rounded-md drop-shadow-md">
                <Disclosure
                    as="section"
                    aria-labelledby="filter-heading"
                    className="relative z-10 grid items-center"
                >
                    <span id="filter-heading" className="sr-only">
                        Filters
                    </span>
                    <div className="relative col-start-1 row-start-1 py-4 pointer-events-none">
                        <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                            {/* Filters */}
                            <div className="pointer-events-auto">
                                <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                                    <FilterIcon
                                        className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    Filtres
                                </Disclosure.Button>
                            </div>
                            {/* Sorting */}
                            <div className="pl-6 pointer-events-auto">
                                <Sort
                                    sendSortToParent={sendSortToParent}
                                    sortOptions={sortOptions}
                                    onSortOptionChange={onSortOptionChange}
                                />
                                {/* <ANEPTri 
                                    data={sortOptions}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="border-t border-gray-200 py-10">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                                <fieldset>
                                    <legend className="block font-medium">
                                        Price
                                    </legend>
                                    <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                        {filters.price.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center text-base sm:text-sm"
                                                >
                                                    <input
                                                        id={`price-${optionIdx}`}
                                                        name="price[]"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`price-${optionIdx}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className="block font-medium">
                                        Color
                                    </legend>
                                    <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                        {filters.color.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center text-base sm:text-sm"
                                                >
                                                    <input
                                                        id={`color-${optionIdx}`}
                                                        name="color[]"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`color-${optionIdx}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                                <fieldset>
                                    <legend className="block font-medium">
                                        Size
                                    </legend>
                                    <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                        {filters.size.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center text-base sm:text-sm"
                                                >
                                                    <input
                                                        id={`size-${optionIdx}`}
                                                        name="size[]"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`size-${optionIdx}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className="block font-medium">
                                        Category
                                    </legend>
                                    <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                        {filters.category.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center text-base sm:text-sm"
                                                >
                                                    <input
                                                        id={`category-${optionIdx}`}
                                                        name="category[]"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`category-${optionIdx}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </Disclosure.Panel>
                    {/* Search */}
                    <div className="relative col-start-1 row-start-1 py-4 pointer-events-none">
                        <form className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative pointer-events-auto">
                                <SearchButton
                                    url="api/emplois"
                                    label="Recherche"
                                    typeInput="text"
                                    size="lg"
                                    classNameInput="focus:ring-0 min-w-[300px] pr-20"
                                    typeButton="button"
                                    icon="material-symbols:search-rounded"
                                    classNameButton="!absolute right-0.5 top-0.5 scale-95"
                                    sendSearchToParent={sendSearchToParent}
                                />
                            </div>
                        </form>
                    </div>
                    {/* Add employee button */}
                    <div className="relative col-start-1 row-start-1 py-4 pointer-events-none">
                        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <ANEPBtn
                                name="Add a new employee"
                                color="blue"
                                className="pointer-events-auto"
                            />
                        </div>
                    </div>
                </Disclosure>
            </nav>
        </>
    );
};

export default NavFilter;
