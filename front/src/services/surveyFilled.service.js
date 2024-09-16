import { APIuser } from "./service.ApiUser";

export const createSurveyFilled = async (formData, id) => {
    return APIuser(`surveyCompleted/createSurveyCompleted/${id}`, {
        method: "POST",
        body: JSON.stringify({
            formData,
        }),
    })
        .then((res) => res)
        .catch((error) => console.log("Error: ", error));
};

export const getStatsSurveyById = async (id) => {
    return APIuser(`surveyCompleted/statsSurvey/${id}`, {
        method: "GET",
    })
        .then((res) => res)
        .catch((error) => error);
};
