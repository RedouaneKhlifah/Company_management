import React, { useState } from "react";
import CardEmploi from "../../../components/utils/CardEmploi";
import Pagination from "../../../components/Pagination";

import NavFilter from "../../../components/NavFilter";
import { Icon } from "@iconify/react";

const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmploiHome() {
    const [obj, setObj] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSearch, setSelectedSearch] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState("Titre");
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDataSort = (optionValue) => {
        setData({ sort: optionValue, search: data.search });
    };

    const handleSortOptionChange = (optionValue) => {
        setSelectedSortOption(optionValue);
    };
    const handleDataSearch = (value) => {
        setSelectedSearch(value);
    };

    const handleData = (value) => {
        setObj(value);
    };

    return (
        <>
            <div>
                <NavFilter
                    sendSearchToParent={handleDataSearch}
                    sendSortToParent={handleDataSort}
                    onSortOptionChange={handleSortOptionChange}
                    sortOptions={sortOptions}
                />
                {isLoading ? ( // Check if the data is still loading
                    <div className="text-center mt-10 pt-11 flex justify-center ">
                        <Icon
                            icon="svg-spinners:ring-resize"
                            className="m-11 "
                            width="100"
                            height="100"
                            color="#035179"
                        />{" "}
                        {/* Display the loading spinner */}
                    </div>
                ) : obj.length === 0 ? ( // Check if the array is empty
                    <div className="text-center mt-4">
                        <p>No data available.</p>{" "}
                        {/* Display a message for no data */}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 ">
                            {obj.map((element) => (
                                <CardEmploi
                                    key={element._id}
                                    titre={element.info_emploi.Titre}
                                    specialite={element.info_emploi.Spécialité}
                                    exp={element.info_emploi.Expérience}
                                    id={element._id}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Pagination
                sort={selectedSortOption}
                search={selectedSearch}
                url="api/emplois"
                sendDataToParent={handleData}
                currentPage={handlePageChange}
                setIsLoading={setIsLoading}
            />
        </>
    );
}

export default EmploiHome;
