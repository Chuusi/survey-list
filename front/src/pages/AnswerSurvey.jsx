import { useEffect, useState } from "react"
import "./AnswerSurvey.css"
import { getSurveyById } from "../services/survey.service";
import { useNavigate } from "react-router-dom";
import { createSurveyFilled } from "../services/surveyFilled.service";
import PropTypes from 'prop-types'

export const AnswerSurvey = ({id}) => {
  
  const [survey, setSurvey] = useState({});
  const [res, setRes] = useState({})
  const [resAnswer, setResAnswer] = useState({})
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSurvey = async() => {
      setRes(await getSurveyById(id))
    }
    fetchSurvey();
  },[id])

  useEffect(() => {
    if(res && res.status == 200){
      setSurvey(res.data)
    }
  },[res])
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const answers = {surveyFull:[]};
    let filled = true;

    survey.questions.forEach((question, index) => {
      if(formData.get(`q_${index}`) == null || formData.get("owner") == "") {
        alert("Rellena todo el formulario, incluído el nombre")
        filled = false;
        return 
      }
      answers.surveyFull.push({"text":question.text, "answer":formData.get(`q_${index}`)})
    })

    answers["owner"] = formData.get("owner")
    
    if(filled) {
      setResAnswer(answers);
    }

  }

  useEffect(() => {
    const sendAsnwer = async() => {
      await createSurveyFilled(resAnswer, id);
    };
    if(resAnswer && Object.keys(resAnswer).length > 0){
      console.log(resAnswer);
      
      sendAsnwer();
      alert("Gracias por contestar la encuesta")
      setCompleted(true)
    }

    
  },[resAnswer,id])
  
  if(completed){
    return navigate("/surveys")
  }

  return (
    <div className="survey_answer center">
      <div className="answer_container">
        <form onSubmit={handleSubmit} className="form_answer">
          <h2 value={survey.title}>{survey.title}</h2>
          <input type="text" name="owner" placeholder="Tu nombre"/>
          {survey?.questions?.map((question,index) => {
            return (
              <div className="each_question" key={index}>
                <p value={question.text}>{question.text}</p>
                <div className="each_answer_container">
                  {question?.options?.map((option, optionIndex) => (
                      <div className="each_answer" key={optionIndex} >
                        <input 
                          type="radio" 
                          name={`q_${index}`} 
                          id={`q_${index}_a_${optionIndex}`} 
                          value={option}
                        />
                        <label htmlFor={`q_${index}_a_${optionIndex}`} >{option}</label>
                      </div>
                  ))}
                </div>

              </div>
            )
          })}
          <section className="buttons_answer">
            <button type="submit">Enviar</button>
            <button onClick={() => navigate("/surveys")}>Volver</button>
          </section>
        </form>
      </div>
    </div>
  )
}


AnswerSurvey.propTypes = {
  id: PropTypes.string.isRequired,
}