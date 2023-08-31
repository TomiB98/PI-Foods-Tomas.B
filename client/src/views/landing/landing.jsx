import style from './landing.module.css'
import { NavLink } from 'react-router-dom'
import image from '../../asets/5092154.png'

const Landing = () => {
    return (
        <div className={style.landing}>
            <div>
                <h1>API: HenryFoods</h1>
                <NavLink to='/home' style={{ textDecoration: "none", color: "inherit" }}>
                    <button className={style.btnHome}>Start</button>
                </NavLink>
            </div>
            <div>
                <img className={style.img} src={image} alt="" />
            </div>
        </div>
    )
}

export default Landing;