import axios from "axios";
const fetchModules = async () => {
    const url = "http://localhost:5000/api/module";

    try {
        const response = await axios.get(url);
        const modules = response.data;
        return modules;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { fetchModules };
