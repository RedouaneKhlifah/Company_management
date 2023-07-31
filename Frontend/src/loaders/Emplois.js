import axios from "axios";
const fetchEmploi = async ({ params }) => {
    const url = "http://localhost:5000/api/emplois/";
    console.log(params);
    try {
        const response = await axios.get(url + params.id);
        const datas = response.data;
        return datas.emploi;
    } catch (error) {
        console.log(error);
        // window.location.href = "/404";
        return error;
    }
};

export { fetchEmploi };
