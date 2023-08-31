import style from './card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ id, name, healthScore, steps, image }) => {

    return (
        <div className={style.card} >
            <div className={style.conteiner}>
                <Link to={`/detail/${id}`}>
                    <img src={image} alt="" />
                </Link>

            </div>
            <div>
                <h1 className={style.h2}>{name}</h1>
                <div className={style.conteiner2}>
                    <h3>Steps: {steps.split('.').length}</h3>
                    <h3>HealthScore: {healthScore}</h3>
                </div>
            </div>
        </div>
    )
}

export default Card;