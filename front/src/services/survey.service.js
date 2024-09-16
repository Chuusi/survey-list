import { APIuser } from "./service.ApiUser";

export const createNewSurvey = async (formData) => {
    return APIuser("survey/createSurvey", {
        method: "POST",
        body: JSON.stringify({
            formData,
        }),
    })
        .then((res) => res)
        .catch((error) => console.log("Error: ", error));
};

export const getAllSurvey = async () => {
    return APIuser("survey/allSurveys", {
        method: "GET",
    })
        .then((res) => res)
        .catch((error) => error);
};

export const getSurveyById = async (id) => {
    return APIuser(`survey/surveyById/${id}`, {
        method: "GET",
    })
        .then((res) => res)
        .catch((error) => error);
};
