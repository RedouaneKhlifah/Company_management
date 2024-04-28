import axios from "axios";

const fetchEmploi = async ({ params }) => {
    const url = "http://localhost:5000/api/emploi/";
    try {
        const response = await axios.get(url + params.id);
        const datas = response.data;
        return datas.emploi;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { fetchEmploi };
