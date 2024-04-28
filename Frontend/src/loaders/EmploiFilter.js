import axios from "axios";

const fetchFilterEmplois = async () => {
  
    try {
      const url = "http://localhost:5000/api/emploi";
    const page = 1;
    console.log("hadi:");
    console.log(page);
    const response = await axios.get(
      `${url}?page=${page}`
    );
    const donne = response.data;
    return donne;
  } catch (error) {
    console.error("Error fetching emplois:", error);
  }
 
};


export { fetchFilterEmplois };
