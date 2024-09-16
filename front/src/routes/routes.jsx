import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import { CreateSurvey, Home, ListOfSurveys, StatsSurvey } from "../pages"
import { SurveyRoute } from "../pages/SurveyRoute"
import { StatsSurveyRoute } from "../pages/StatsSurveyRoute"

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/create',
                element:<CreateSurvey/>
            },
            {
                path:'/surveys',
                element:<ListOfSurveys/>,
                children:[
                    {
                        path:"/surveys",
                        element:<ListOfSurveys/>,
                    },
                    {
                        path:'/surveys/stats',
                        element:<StatsSurvey/>
                    }
                ]
            },
            {
                path:'/surveys/sv/:id',
                element:<SurveyRoute/>
            },
            {
                path:"/surveys/stats/:id",
                element:<StatsSurveyRoute/>
            }
        ]
    }
])