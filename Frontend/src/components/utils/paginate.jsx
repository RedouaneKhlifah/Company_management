import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import axios from "axios";

export function Paginate({ url, filters = [], sendDataToParent }) {
    const [active, setActive] = useState(1);

    // const [totalPageCount, setTotalPageCount] = useState(1);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "blue" : "blue-gray",
        onClick: () => setActive(index)
    });

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    const getData = async () => {
        console.log(filters);
        // Stringify the filters object and encode it to be URL-safe
        const filtersString = JSON.stringify(filters);

        const res = await axios.get(`${url}/${active}/${filtersString}`);
        const payload = res.data;
        sendDataToParent(payload);
    };

    useEffect(() => {
        getData();
        console.log("test");
    }, [active, filters]);

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)}>1</IconButton>
                <IconButton {...getItemProps(2)}>2</IconButton>
                <IconButton {...getItemProps(3)}>3</IconButton>
                <IconButton {...getItemProps(4)}>4</IconButton>
                <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Next
            </Button>
        </div>
    );
}
