import { useParams } from "react-router-dom";
import { AnswerSurvey } from "./AnswerSurvey";

export const SurveyRoute = () => {
    const {id} = useParams();
    
    return <AnswerSurvey id={id}/>
}
