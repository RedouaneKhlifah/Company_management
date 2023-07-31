import React, { useState, useEffect } from "react";
import CardEmploi from "../../../components/utils/CardEmploi";
import AllFilters from "../../../components/AllFilters";
import Pagination from "../../../components/Pagination";
import axios from "axios";
import { Icon } from "@iconify/react";

const url = "http://localhost:5000/api/emplois";

function EmploiHome() {
    const [currentPage, setCurrentPage] = useState(1);
    const [obj, setObj] = useState([]);
    const [totalPageCount, settotalPageCount] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState("Titre");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleInputValueChange = (value) => {
        setSearch(value);
    };
    const handleSortOptionChange = (optionValue) => {
        setSelectedSortOption(optionValue);
    };

    useEffect(() => {
        const getAllEmploi = async () => {
            try {
                console.log(url);
                setIsLoading(true);
                const response = await axios.get(url);
                const donne = response.data;
                setObj(donne.emplois);
                setIsLoading(false);
                settotalPageCount(Math.ceil(donne.rowCount / 12));
                if (search !== "") {
                    setCurrentPage(1);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getAllEmploi();
        console.log(selectedSortOption);
    }, [currentPage, search, selectedSortOption]);
    return (
        <div>
            <AllFilters
                onInputChange={handleInputValueChange}
                onSortOptionChange={handleSortOptionChange}
                selectedSortOption={selectedSortOption}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5">
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
                    <Pagination
                        currentPage={currentPage}
                        totalPageCount={totalPageCount} // Pass the totalPageCount to the Pagination component
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default EmploiHome;
