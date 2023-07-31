import React from "react";
import ModuleTable from "../../../components/ModuleTable";
import ModalBtn from "../../../components/ModalBtn";

function ModuleHome() {
    return (
        <>
            <ModalBtn
                url="http://localhost:5000/api/module"
                Inputes={["titre"]}
                autocompleteInpute={true}
                name="Ajouter un nouveau module"
                className="scale-90"
                icon="ic:baseline-plus"
            />
            <ModuleTable />
        </>
    );
}

export default ModuleHome;
