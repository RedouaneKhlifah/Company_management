import React, { useState } from "react";
import CardEmploi from "../../../components/utils/CardEmploi";
import Pagination from "../../../components/Pagination";

import NavFilter from "../../../components/NavFilter";
import { Icon } from "@iconify/react";
import CardEmploiSkelton from "../../../skilton/emploi/CardEmploiSkelton";


// sort options
const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmploiHome() {
    const [emploisData, setemploisData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchSortData , setSearchSortData] = useState({
        sort : "",
        search : ""
    })
    
    return (
        <>
            <div>
                <div className="z-50" style={{ zIndex: 100 }}>
                <NavFilter
                    sortOptions = {sortOptions}
                    sendSortSearchDataToParent={setSearchSortData}
                />
                </div>
                {isLoading ? ( // Check if the data is still loading
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 ">
{                     Array.from({ length: 12 }, (_, index) => (
                            <CardEmploiSkelton key={index} />
                        ))}
                    </div>
                    ) : emploisData.length === 0 ? ( // Check if the array is empty
                    <div className="text-center mt-4">
                        <p>No data available.</p>{" "}
                        {/* Display a message for no data */}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 z-0 " style={{ zIndex: 0 }}>
                            {emploisData.map((element) => (
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
                searchSortData = {searchSortData}
                url="api/emplois"
                sendDataToParent={setemploisData}
                setIsLoading={setIsLoading}
            />
        </>
    );
}

export default EmploiHome;
