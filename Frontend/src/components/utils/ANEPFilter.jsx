import { Disclosure } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/solid";


const filters = {
    specialite: [
        { value: "0", label: "$0 - $25", checked: false },
        { value: "25", label: "$25 - $50", checked: false },
        { value: "50", label: "$50 - $75", checked: false },
        { value: "75", label: "$75+", checked: false }
    ],
    formation: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false }
    ],
    experience: [
        { value: "xs", label: "XS", checked: false },
        { value: "s", label: "S", checked: true },
        { value: "m", label: "M", checked: false },
        { value: "l", label: "L", checked: false },
        { value: "xl", label: "XL", checked: false },
        { value: "2xl", label: "2XL", checked: false }
    ]
};
export default function ANEPFilter() {
    return (
        <div className="">
            {/* Filters */}
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className=" z-10  grid items-center"
            >
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>
                <div className="relative col-start-1 row-start-1 py-4">
                    <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                        <div>
                            <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                                <FilterIcon
                                    className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                2 Filters
                            </Disclosure.Button>
                        </div>
                        <div className="pl-6">
                            <button type="button" className="text-gray-500">
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel className="py-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-3 md:gap-x-6">
                            <fieldset>
                                <legend className="block font-medium">
                                    specialite
                                </legend>
                                <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    {filters.specialite.map(
                                        (option, optionIdx) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center text-base sm:text-sm"
                                            >
                                                <input
                                                    id={`price-${optionIdx}`}
                                                    name="price[]"
                                                    defaultValue={option.value}
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
                                    formation
                                </legend>
                                <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    {filters.formation.map(
                                        (option, optionIdx) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center text-base sm:text-sm"
                                            >
                                                <input
                                                    id={`color-${optionIdx}`}
                                                    name="color[]"
                                                    defaultValue={option.value}
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
                            <fieldset>
                                <legend className="block font-medium">
                                    experience
                                </legend>
                                <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    {filters.experience.map(
                                        (option, optionIdx) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center text-base sm:text-sm"
                                            >
                                                <input
                                                    id={`size-${optionIdx}`}
                                                    name="size[]"
                                                    defaultValue={option.value}
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
                        </div>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
}
