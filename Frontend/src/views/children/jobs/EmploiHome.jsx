import React from "react";
import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import CardEmploi from "../../../components/utils/CardEmploi";

// sort options
const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmploiHome() {
    return (
        <PaginateSortSearchHOC
            url="api/emploi"
            CardComponent={CardEmploi}
            sortOptions={sortOptions}
        />
    );
}

export default EmploiHome;
