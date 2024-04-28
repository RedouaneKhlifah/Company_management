const autocompleteUrl = "http://localhost:5000/api/competence/modelessCompetences";

export const CompetenceslessModule = async () => {
    try {
        const res = await axios.get(autocompleteUrl);
        return res.data
    } catch (error) {
        return error && error?.message
    }
};


