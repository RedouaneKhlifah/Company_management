import React from "react";
import ANEPBtn from "./utils/ANEPBtn";
import { useLoaderData } from "react-router-dom";

function ModuleTable() {
    const modules = useLoaderData();
    return (
        <>
            <div className=" w-full mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto ">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className=" bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6"
                                        ></th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6"
                                        >
                                            Modules
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                        >
                                            Nu competence
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {modules.map((module, index) => {
                                        return (
                                            <tr key={module._id}>
                                                <td className="w-1/12 px-3 py-4 text-sm text-gray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="w-7/12 py-4  pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hover:underline cursor-pointer">
                                                    {module.titre}
                                                </td>
                                                <td className="w-2/12 px-3 py-4 text-sm text-gray-700">
                                                    {module?.competences.length}
                                                </td>
                                                <td className="w-4/12 px-3 py-4 text-sm text-gray-700">
                                                    <ANEPBtn name={"Explore"} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="md:px-6 lg:px-8 pt-6 pb-4 border-t-2">
                                {/* <Pagination /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModuleTable;
