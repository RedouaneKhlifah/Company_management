import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import { Paginate } from "./utils/paginate";
import Filter from "./utils/Filter";

function CompetanceTable() {
    const competence = useLoaderData();

    const [competences, setcompetences] = useState([]);

    const handlePageChange = (data) => {
        setcompetences(data);
    };

    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSelectedFilters = (selectedFilters) => {
        setSelectedFilters(selectedFilters);
    };

    return (
        <>
            <Filter sendDataToParent={handleSelectedFilters} />
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
                                        >
                                            Compétences
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                        >
                                            Type de savoir
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                        >
                                            Module
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {competences.map((competence) => (
                                        <tr key={competence._id}>
                                            <td className="w-6/12 py-4  pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hover:underline cursor-pointer">
                                                {competence.titre}
                                            </td>
                                            <td className="w-2/12 px-3 py-4 text-sm text-gray-700">
                                                {competence.type_de_savoire}
                                            </td>
                                            <td className="w-4/12 px-3 py-4 text-sm text-gray-700">
                                                {competence.module_id?.titre ??
                                                    "none"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="md:px-6 lg:px-8 pt-6 pb-4 border-t-2">
                                <Paginate
                                    url="http://localhost:5000/api/competence"
                                    filters={selectedFilters}
                                    sendDataToParent={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompetanceTable;
