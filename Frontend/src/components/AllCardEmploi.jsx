import { useLoaderData } from "react-router-dom";
import CardEmploi from "./utils/CardEmploi";

// import React, { useState, useEffect } from 'react';

function AllCardEmplois() {
    const datas = useLoaderData();
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
        {datas.map((element) => (
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
    )
}
export default AllCardEmplois;
