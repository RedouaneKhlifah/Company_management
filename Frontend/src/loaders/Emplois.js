import axios from "axios";
const fetchAllEmplois = async () => {
    const url = "http://localhost:5000/api/emplois";

    try {
        const response = await axios.get(url);
        const datas = response.data;
        return datas;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { fetchAllEmplois };
