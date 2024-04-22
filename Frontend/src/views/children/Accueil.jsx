import BoxStatus from "../../components/Accueil/BoxStatus";
import { icons } from "../../constant/icons";
import Schedule from "../../components/Accueil/Schedule"
import ScheduleModel from "../../components/modals/ScheduleModel"
import { useEffect, useState } from "react";
function Accueil() {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        id : null,
        strDate  : "", 
        endDate : "",
        title : "",
    })

    useEffect(()=>{
        console.log(form)
    },[form])
    return (
        <>
            <div className="flex items-center justify-between gap-10 my-6">
                <BoxStatus bgColor = {'bg-gradient-to-r from-blue-600 to-blue-800'} icon = {icons.PersonIcon} title = "Nombre Total de Personnes" number = "300" />
                <BoxStatus bgColor = {'bg-gradient-to-r from-yellow-300 to-yellow-500'} icon = {icons.graphUp} title = "Nombre Total d'Emplois" number = "300" />
                <BoxStatus bgColor = {'bg-gradient-to-r from-green-500 to-green-700'} icon = {icons.check} title = "Nombre Total de Compétences" number = "300" />
                <BoxStatus bgColor = {'bg-gradient-to-r from-orange-400 to-orange-600'} icon = {icons.pieChart} title = "Nombre Total de Modules" number = "300" />
            </div>
                <Schedule setOpen={setOpen} setForm = {setForm}/>
                <ScheduleModel open={open} setOpen={setOpen}/>
        </>
    )
}

export default Accueil;
