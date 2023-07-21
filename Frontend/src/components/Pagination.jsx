/* This example requires Tailwind CSS v2.0+ */
// import {
//     ArrowNarrowLeftIcon,
//     ArrowNarrowRightIcon
// } from "@heroicons/react/solid";

function Pagination() {
    return (
        <nav className="  border-gray-200 px-4 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex">
                <a
                    href="#"
                    className="border rounded-lg border-gray-500  p-2 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 "
                >
                    Précédent
                </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
                <a
                    href="#"
                    className="border rounded-lg border-gray-500  p-2 text-anep-primary hover:border-anep-primary  px-4 inline-flex items-center text-sm font-medium"
                >
                    1
                </a>
                {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                <a
                    href="#"
                    className=" text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium"
                    aria-current="page"
                >
                    2
                </a>
                <a
                    href="#"
                    className=" text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium"
                >
                    3
                </a>
                <span className="text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium">
                    ...
                </span>
                <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium"
                >
                    8
                </a>
                <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium"
                >
                    9
                </a>
                <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium"
                >
                    10
                </a>
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
                <a
                    href="#"
                    className="border rounded-lg border-gray-500  p-2 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                    Suivant
                </a>
            </div>
        </nav>
    );
}

export default Pagination;
