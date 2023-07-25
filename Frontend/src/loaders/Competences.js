import axios from "axios";
const fetchAllCompetences = async () => {
    const url = "http://localhost:5000/api/competence";

    try {
        const response = await axios.get(url);
        const datas = response.data.competencesWithModule;
        return datas;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { fetchAllCompetences };
