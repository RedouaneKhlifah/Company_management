import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function CompetanceTable() {
    const [datas, setDatas] = useState([]);
    const url = "http://localhost:5000/api/competence";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setDatas(response.data.competencesWithModule);
                console.log(response.data.competencesWithModule);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="flex bg-anep-secondary ">
                <div className="w-2/12">bdcbcvv</div>
                <div className=" w-10/12 mt-8 flex flex-col">
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
                                        {datas.map((data) => (
                                            <tr key={data.competence._id}>
                                                <td className="w-6/12 py-4  pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hover:underline cursor-pointer">
                                                    {data.competence.titre}
                                                </td>
                                                <td className="w-2/12 px-3 py-4 text-sm text-gray-700">
                                                    {
                                                        data.competence
                                                            .type_de_savoire
                                                    }
                                                </td>
                                                <td className="w-4/12 px-3 py-4 text-sm text-gray-700">
                                                    {data.module ?? "none"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="md:px-6 lg:px-8 pt-6 pb-4 border-t-2">
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompetanceTable;
