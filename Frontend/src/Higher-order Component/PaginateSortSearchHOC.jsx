import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Pagination from "../components/Pagination";
import NavFilter from "../components/NavFilter";
import CardEmploiSkelton from "../skilton/emploi/CardEmploiSkelton";
import { GlobalVariables } from "../App";

function PaginateSortSearchHOC({url, CardComponent, sortOptions}) {
  const { backendURL } = useContext(GlobalVariables);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState([]);
  const [error, setError] = useState(null);

  const [searchSortData, setSearchSortData] = useState({
    sort: "",
    search: ""
  });

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${backendURL}${url}?page=${currentPage}&search=${searchSortData.search}&sort=${searchSortData.sort}`
      );
      const resData = response.data;
      setData(resData.data);
      setTotalPageCount(Math.ceil(resData.rowCount / 12));
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Error fetching data. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchSortData]);

  useEffect(() => {
    getData();
  }, [currentPage, searchSortData]);

  return (
    <>
      <div>
        <div className="z-50" style={{ zIndex: 100 }}>
          <NavFilter
            sortOptions={sortOptions}
            sendSortSearchDataToParent={setSearchSortData}
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 ">
            {Array.from({ length: 12 }, (_, index) => (
              <CardEmploiSkelton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center mt-4">
            <p>{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center mt-4">
            <p>No jobs found. Please try different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 z-0 ">
            {data.map((element) => (
              <CardComponent key={element._id} data={element} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
      />
    </>
  );
}

PaginateSortSearchHOC.propTypes = {
  url: PropTypes.string.isRequired,
  CardComponent: PropTypes.elementType.isRequired,
  sortOptions: PropTypes.array.isRequired
};

export default PaginateSortSearchHOC;
