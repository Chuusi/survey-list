import "./StatsSurvey.css"
import PropTypes from 'prop-types'
import 'charts.css/dist/charts.min.css'
import React, { useEffect, useState } from "react"
import { getStatsSurveyById } from "../services/surveyFilled.service"
import { useNavigate } from "react-router-dom"

export const StatsSurvey = ({id}) => {
  
  const [data, setData] = useState({})
  const [res, setRes] = useState({});
  const navigate = useNavigate();

  const randomNum = () => {
    return Math.floor(Math.random() * 256);
  }

  const randomRGBA = () => {
    let r = randomNum();
    let g = randomNum();
    let b = randomNum();
    let a = Math.random() * (.7 - .2) + .2;
    console.log(`rgba(${r},${g},${b},${a})`);
    
    return `rgba(${r},${g},${b},${a})`
  }

  useEffect(() => {
    const fetchData = async() => {
      setRes(await getStatsSurveyById(id))
    };    
    fetchData();
  },[id])

  useEffect(() => {
    if(res.status == 200){
      setData(res.data)
      console.log(res.data);
      
    }
  },[res])
  
  return (
    <div className="stats_survey center">
      <div className="results_container">
        <table className="table charts-css bar show-heading multiple show-data-on-hover show-labels data-start show-data-axes">
          <caption className="stats_survey_title">{data.title}</caption>
          <tbody>
          {data && data?.answer?.map((answer, index) => {
            return (
              <React.Fragment key={`tr_${index}`}>

              <tr className="each_answer_title" key={`tr_${index}`}>
                <td style={{backgroundColor:"transparent"}}>
                  <span scope="row">{answer.text}</span>
                </td>
              </tr>  
                {answer.options.map((option,optionIndex) => {
                  return (
                    <React.Fragment key={`tr_${index}_${optionIndex}`}>
                      <tr className="each_answer_option" style={{backgroundColor:"transparent"}}>
                        <td style={{backgroundColor:"transparent"}}>
                          <p>{option.answer}</p>
                        </td>
                      </tr>
                      <tr className="each_answer_option">
                        <td 
                          className="custom-background"
                          style={option.num > 0 
                            ? {
                              "--size": `calc(${option.num}/${data.total})`, 
                              "background": `${randomRGBA()}`
                              } 
                            : {"--size":`100%`,
                              "background": "transparent"
                            }}
                        >
                          {option.num > 0 
                          ? <span 
                              className={(option.num * 100 / data.total) < 10 ? "data outside" : "data"}
                            >{(option.num * 100 / data.total).toFixed(2)}%
                            </span> 
                          : <span className="data">0%</span>}
                        </td>
                      </tr>  
                    </React.Fragment>
                  )
                })}

              
              </React.Fragment>
            )
          })}
          </tbody>

        </table>
        <button className="stats_button" onClick={() => navigate("/surveys")}>Volver</button>

      </div>
    </div>
  )
}

StatsSurvey.propTypes = {
  id: PropTypes.string.isRequired,
}