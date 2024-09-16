import "./Home.css"
import {NavLink} from "react-router-dom"

export const Home = () => {
    return (
        <div className="home center">
            <div className="home_container center">
                <h1 className="home_title">Creador de formularios</h1>
                <div className="button_container center">
                    <div className="create_button home_button center">
                        <NavLink to="/create">
                            <h3>CREAR</h3>
                        </NavLink>
                    </div>
                    <div className="list_home_button home_button center">
                        <NavLink to="/surveys">
                            <h3>LISTA</h3>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
