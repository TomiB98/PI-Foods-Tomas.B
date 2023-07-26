import style from './landing.module.css'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className={style.landing}>
            <h1>API:Foods</h1>
            <Link to={`/home`}>
                <button className={style.btnHome}>Home</button>
            </Link>
        </div>
    )
}

export default Landing;