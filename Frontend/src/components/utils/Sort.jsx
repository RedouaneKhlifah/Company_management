import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useState } from "react";

function Sort({ sortOptions, onSortOptionChange }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    
    const [close,setClose] = useState(false)

    const [activeSortName, setActiveSortName,] = useState("")

    return (
        <>
                <Menu as="div" className="relative inline-block bg-white w-60 py-1 rounded-md  " style={{ zIndex: 100 }}>
                    <div className="flex justify-between items-en ">
                        <Menu.Button onClick={()=>setClose(!close)} className="group flex justify-between items-center w-full px-5 text-sm font-medium text-gray-700 hover:text-gray-900">
                            <span>{"Tri par " +activeSortName } </span> 
                            <ChevronDownIcon
                            className="flex-shrink-0 -mr-1 ml-1 h-7 w-7 text-gray-400 group-hover:text-gray-500"
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
                        <Menu.Items className=" w-full origin-top-right absolute right-0 mt-2 rounded-md shadow-2xl z-50 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ zIndex: 100 }}>
                            <div className="py-1 ">
                                {sortOptions.map((option) => (
                                    <Menu.Item key={option.name}>
                                        {({ active }) => (
                                            <a
                                                // href={option.href} // Remove this line
                                                onClick={() => {
                                                   
                                                    setActiveSortName(  option.name === activeSortName ?  "" :option.name);
                                                    onSortOptionChange(
                                                        option.name === activeSortName ?  "" : option.value
                                                    );
                                                }}
                                                className={classNames(
                                                    option.name  === activeSortName ? 
                                                    "bg-gray-100" :
                                                    active ? "bg-gray-100" : "",
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
        </>
    );
}

export default Sort;
