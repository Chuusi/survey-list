export const useCreateSurveyError = (res, setRes) => {
    if(res.status == 200){
        setRes(() => {});
        alert("Formulario creado")
    }
}