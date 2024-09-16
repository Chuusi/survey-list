import { useEffect, useState } from "react"
import "./CreateSurvey.css"
import { useForm } from "react-hook-form"
import { createNewSurvey } from "../services/survey.service";
import { useNavigate } from "react-router-dom"

const Answer = ({num, question, register}) => {
    const inputs = [];
    for(let i = 0; i < num; i++){
        inputs.push(
            <input 
                key={`q${question}a${i}`} 
                type="text" 
                name= {`answer_${i}_question_${question}`} 
                id={`answer_${i}_question_${question}`}
                placeholder={`Opción ${i+1}`}
                {...register(`q_${question}_a_${i}`)}
            />
        )
    }
    return inputs;
}

const Question = ({num, register}) => {

    const [numberAnswer, setNumberAnswer] = useState({});

    const handleNumberAnswers = (e, questionIndex) => {
        const value = e.target.value || 1;
        setNumberAnswer(prevState => ({
            ...prevState,
            [questionIndex] : value,
        }));
    }

    const inputs = [];
    for(let i = 0; i < num; i++){
        inputs.push(
            <div className="center each_question" key={`q${i}`}>
                <div className="title_question_container">
                    <p className="title_question">Pregunta {i+1}:</p>
                    <input 
                        className="question_input"
                        type="text" 
                        name= {`question_${i}`} 
                        id={`question_${i}`} 
                        placeholder="Texto de la pregunta"
                        {...register(`q_${i}`)}
                    />
                    <div className="number_question_container">
                        <p className="number_question">Opciones: </p>
                        <input 
                            type="number" 
                            name="number_answers" 
                            className="number_answers"
                            id={`number_answers_${i}`} 
                            onChange={(e)=> handleNumberAnswers(e, i)}
                            defaultValue={2}
                            min={2}
                            max={10}
                        />
                    </div>
                </div>
                <div className="answer_list center">
                    <Answer num={numberAnswer[i] || 2} question={i} register={register}/>
                </div>
            </div>
    )
    }
    return inputs;
}

export const CreateSurvey = () => {

    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const [send, setSend] = useState(false);
    const [res, setRes] = useState({})
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()

    const handleNumberOfQuestions = (e) => {
        setNumberOfQuestions(e.target.value);
    }
    
    const formSubmit = async(formData) => {
        const customFormData = {questions:[]}
        for (let key in formData){
            if (key == "owner" || key == "title"){
                customFormData[key] = formData[key]
            } else if (formData[key] !== ""){                
                if(key.length == 3){
                    customFormData.questions.push({text:formData[key], options:[]})
                } else {
                    customFormData.questions[key[2]].options.push(formData[key]);
                }
            }
        }

        //Tenemos el formato deseado
        setSend(true);
        const result = await createNewSurvey(customFormData)
        setRes(result);
        setSend(false);
        
    }

    useEffect(() => {
        console.log("RESPUESTA", res);
        
        if(res && res.status == 200){
            alert("Encuesta creada")
            navigate("/");
        }
    },[res, navigate])

    return (
        <div className="create_survey center">
            <div className="form_container">
                <form onSubmit={handleSubmit(formSubmit)} className="form">
                    <h2 className="create_title">CREA TU FORMULARIO</h2>
                    <div className="name_number_container">
                        <div className="title_input_container">
                            <p>Tu nombre: </p>
                            <input 
                                type="text" 
                                name="owner" 
                                id="owner" 
                                placeholder="E.g: Angel"
                                {...register("owner")}
                            />
                        </div>
                        <div className="title_input_container">
                            <p>Nº de preguntas: </p>
                            <input 
                                type="number" 
                                name="number_questions" 
                                id="number_questions" 
                                onChange={handleNumberOfQuestions}
                                min={1}
                                max={10}
                                defaultValue={1}
                            />
                        </div>
                    </div>
                    <div className="questions_container center">
                        <p>Título del cuestionario: </p>
                        <input 
                            type="text" 
                            name="survey_title" 
                            id="survey_title" 
                            placeholder="E.g: Satisfacción hotel"
                            {...register("title",{required:true})}
                        />
                        <Question num={numberOfQuestions} register={register}/>

                    </div>
                    <div className="button_create_container">
                        <button className="submit_button" disabled={send} type="submit">Registrar encuesta</button>
                        <button className="back_button" onClick={() => navigate("/")}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
