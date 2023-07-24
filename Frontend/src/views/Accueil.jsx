import React from "react";
import Sidebar from "../components/Sidebar";
import CompetanceTable from "../components/CompetenceTable";
import ModuleForm from "../components/modals/ModuleForm";
import Button from "../components/utils/Button";

function Accueil() {
    return (
        <div className="">
            {/* <Sidebar /> */}
            {/* <CompetanceTable /> */}
            <div className="m-4">
                <Button
                    title="Enregistrer"
                    bg="anep-primary"
                    textColor="white"
                    textSize="base"
                    rounded="lg"
                    padding="2"
                />
            </div>
            {/* <ModuleForm /> */}
        </div>
    );
}

export default Accueil;
