/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";

const data = [
    {
        key: "price",
        options: [
            { value: "0", label: "$0 - $25", checked: false },
            { value: "25", label: "$25 - $50", checked: false },
            { value: "50", label: "$50 - $75", checked: false },
            { value: "75", label: "$75+", checked: false }
        ]
    },
    {
        key: "color",
        options: [
            { value: "white", label: "White", checked: false },
            { value: "beige", label: "Beige", checked: false },
            { value: "blue", label: "Blue", checked: false },
            { value: "brown", label: "Brown", checked: false },
            { value: "green", label: "Green", checked: false },
            { value: "purple", label: "Purple", checked: false }
        ]
    },
    {
        key: "size",
        options: [
            { value: "xs", label: "XS", checked: false },
            { value: "s", label: "S", checked: false },
            { value: "m", label: "M", checked: false },
            { value: "l", label: "L", checked: false },
            { value: "xl", label: "XL", checked: false },
            { value: "2xl", label: "2XL", checked: false }
        ]
    },
    {
        key: "titre",
        options: [
            {
                value: "Rédaction administrative",
                label: "Rédaction administrative",
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
    }
];

const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Filter({ sendDataToParent }) {
    const [filters, setfilters] = useState(data);
    // clear all check boxes
    const clearAllCheckboxes = () => {
        setfilters((prevFilters) => {
            const filtersUpdate = prevFilters.map((filter) => ({
                ...filter,
                options: filter.options.map((option) => ({
                    ...option,
                    checked: false
                }))
            }));
            return filtersUpdate;
        });
    };

    useEffect(() => {
        sendDataToParent(getSelectedFilters());
        console.log(getSelectedFilters());
    }, [filters]);

    // Function to get selected filters and their checked options
    const getSelectedFilters = () => {
        const selectedFilters = filters
            .filter((filter) =>
                filter.options.some((option) => option.checked === true)
            )
            .map((filter) => ({
                key: filter.key,
                options: filter.options
                    .filter((option) => option.checked === true)
                    .map((option) => option.value)
            }));

        return selectedFilters;
    };

    const handleCheckboxChange = (filterKey, optionValue) => {
        setfilters((prevFilters) => {
            const updatedFilters = prevFilters.map((filter) => {
                if (filter.key === filterKey) {
                    const updatedOptions = filter.options.map((option) => {
                        if (option.value === optionValue) {
                            return {
                                ...option,
                                checked: !option.checked // Toggle the checked state
                            };
                        }
                        return option;
                    });

                    return {
                        ...filter,
                        options: updatedOptions
                    };
                }
                return filter;
            });

            return updatedFilters;
        });
    };

    return (
        <div className="bg-white ">
            {/* Filters */}
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="relative z-0  border-b border-gray-200 grid items-center py-4"
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
                            <button
                                type="button"
                                className="text-gray-500"
                                onClick={clearAllCheckboxes}
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel className="border-t border-gray-200 py-10">
                    <div
                        className={`max-w-7xl mx-auto grid grid-cols-${filters.length} gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8`}
                    >
                        {filters.map((filter) => (
                            <div
                                className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6"
                                key={filter.key}
                            >
                                <fieldset>
                                    <legend className="block font-medium">
                                        {filter.key}
                                    </legend>
                                    <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                        {filter.options.map((option) => {
                                            return (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center text-base sm:text-sm"
                                                >
                                                    <input
                                                        id={`price-${option.value}`}
                                                        name="price[]"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        checked={option.checked}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                filter.key,
                                                                option.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`price-${option.value}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                        {/* end of option */}
                                    </div>
                                </fieldset>
                            </div>
                        ))}
                        {/* next */}
                    </div>
                </Disclosure.Panel>
                <div className="col-start-1 row-start-1 py-4">
                    <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Menu as="div" className="relative inline-block">
                            <div className="flex">
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current
                                                                ? "font-medium text-gray-900"
                                                                : "text-gray-500",
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

export default Filter;
