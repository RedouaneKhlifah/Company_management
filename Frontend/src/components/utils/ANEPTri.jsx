import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export default function ANEPTri({ onSortOptionChange ,selectedSortOption, data }) {
    const sortOptions = data; 
    return (
        <>
            
                <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Menu as="div" className="relative inline-block">
                        <div className="flex">
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Tri
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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl z-20 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                            {({ active }) => (
                                                <a
                                                    // href={option.href} // Remove this line
                                                    onClick={() =>
                                                        onSortOptionChange(
                                                            option.value
                                                        )
                                                    }
                                                    className={classNames(
                                                        option.value ===
                                                        selectedSortOption
                                                            ? "font-medium text-gray-900"
                                                            : "text-gray-500",
                                                        active
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm cursor-pointer"
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
        </>
    );
}
