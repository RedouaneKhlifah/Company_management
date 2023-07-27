import axios from "axios";
const fetchCompetences = async () => {
    const url = "http://localhost:5000/api/competence";

    try {
        const response = await axios.get(url);
        const competences = response.data;
        return competences;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { fetchCompetences };
