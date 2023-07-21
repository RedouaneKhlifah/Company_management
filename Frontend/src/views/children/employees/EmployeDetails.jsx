import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

function EmployeDetails() {
    // Getting the id from the route
    const { id } = useParams();
    // Getting the returned data from "employeDetailsLoader" function
    const employeeId = useLoaderData();
    
    return (
        <div className="">
            The id is : {id}
            <br />
            This is also the same id : { employeeId }
        </div>
    );
}

export const employeDetailsLoader = async ({ params }) => {
    const { id } = params;
    return id;
}

export default EmployeDetails;
