import { useEffect, useState } from "react"
import "./ListOfSurveys.css"
import { getAllSurvey } from "../services/survey.service";
import { useNavigate } from "react-router-dom";

export const ListOfSurveys = () => {
  
  const [allSurveys, setAllSurveys] = useState([]);
  const [res, setRes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setRes(await getAllSurvey())
    }
    fetchData();
  },[])
  
  useEffect(() => {
    if(res && res.status == 200){
      setAllSurveys(res.data)
    }

  },[res])

  return (
    <div className="list_surveys center">
      <div className="survey_container center">
        <section className="list_title">
          <h2 className="list_title_text">LISTA DE FORMULARIOS</h2>
        </section>
        <div className="all_surveys">
          {allSurveys.map((survey) => {
            return (
              <div 
              key={survey._id} 
              className="each_survey center"
              >
                <h3>{survey.title}</h3>
                <div className="buttons_container">
                  <button 
                    className="answer_button"
                    onClick={() => navigate(`/surveys/sv/${survey._id}`)}
                  >
                    Contestar
                  </button>
                  <button 
                    className="stats_button"
                    onClick={() => navigate(`/surveys/stats/${survey._id}`)}                  
                  >
                    Ver estadísticas
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <button className="list_button" onClick={() => navigate("/")}>Volver</button>

      </div>
    </div>
  )
}
