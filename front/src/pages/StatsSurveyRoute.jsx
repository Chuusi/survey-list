import { useParams } from "react-router-dom";
import { StatsSurvey } from "./StatsSurvey";

export const StatsSurveyRoute = () => {
    const {id} = useParams();
    
    return <StatsSurvey id={id}/>
}
