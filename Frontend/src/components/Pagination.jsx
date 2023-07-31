import React, { useState, useEffect, useContext  } from "react";
import axios from "axios";
import { GlobalVariables } from "../App";

function Pagination({ url,setIsLoading,sendDataToParent,search,sort }) {
    const { backendURL } = useContext(GlobalVariables);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState([]);
    const [Search, setSearch] = useState(search); 
    const [Sort, setSort] = useState(sort); 

    // setSearch(search)
    
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    
    
    const getAllEmploi = async (page) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${backendURL}${url}?page=${page}&search=${Search}&sort=${Sort}`
        );
        const donne = response.data;
        sendDataToParent(donne.emplois);
        setTotalPageCount(Math.ceil(donne.rowCount / 12));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    useEffect(() => {
        setSearch(search);
        setSort(sort);
        setCurrentPage(1)
      }, [search, sort]);

    useEffect(() => {

      getAllEmploi(currentPage);
    }, [currentPage,Search,Sort]);

  

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Calculate the number of pages to show in the pagination
    const maxPageNumbersToShow = 5; // You can adjust this value as needed

    // Start and end page numbers for the pagination
    let startPage = 1;
    let endPage = totalPageCount;
    var halfMaxPageNumbersToShow;
    if (totalPageCount > maxPageNumbersToShow) {
        halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
      if (currentPage <= halfMaxPageNumbersToShow) {
        endPage = maxPageNumbersToShow;
      } else if (currentPage >= totalPageCount - halfMaxPageNumbersToShow) {
        startPage = totalPageCount - maxPageNumbersToShow + 1;
      } else {
        startPage = currentPage - halfMaxPageNumbersToShow;
        endPage = currentPage + halfMaxPageNumbersToShow;
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <a
          key={page}
          href="#"
          className={`${
            page === currentPage
              ? "border-anep-primary text-anep-primary  bg-brown-400"
              : "border-gray-500 text-gray-500 hover:text-gray-700 "
          } border rounded-lg p-2 px-4 inline-flex items-center text-sm font-medium`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </a>
      );
    }

    if (totalPageCount > maxPageNumbersToShow) {
      if (currentPage > halfMaxPageNumbersToShow + 1) {
        pageNumbers.unshift(
          <span
            key="left-ellipsis"
            className="text-gray-500 hover:text-gray-700 p-2 inline-flex items-center text-sm font-medium"
          >
            ...
          </span>
        );
      }
      if (currentPage < totalPageCount - halfMaxPageNumbersToShow) {
        pageNumbers.push(
          <span
            key="right-ellipsis"
            className="text-gray-500 hover:text-gray-700 p-2 inline-flex items-center text-sm font-medium"
          >
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="m-10 border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          className={`${
            currentPage === 1
              ? "border-gray-500 text-gray-500"
              : "border-anep-primary text-anep-primary"
          } border rounded-lg p-2 inline-flex items-center text-sm font-medium hover:text-gray-700`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {renderPageNumbers()}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          className={`${
            currentPage === totalPageCount
              ? "border-gray-500 text-gray-500"
              : "border-anep-primary text-anep-primary"
          } border rounded-lg p-2 inline-flex items-center text-sm font-medium hover:text-gray-700`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPageCount}
        >
          Suivant
        </a>
      </div>
    </nav>
  );
}

export default Pagination;
