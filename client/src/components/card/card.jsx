import style from './card.module.css'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ id, name, healthScore, steps, image, vegan, glutenFree, dairyFree, vegetarian }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/detail/${id}`)
    }

    return (
        <div onClick={handleNavigate} className={style.card} >
            <div className={style.conteiner}>
                {/* <Link to={`/detail/${id}`}> */}
                    <img src={image} alt="" />
                {/* </Link> */}

            </div>
            <div>
                <h1 className={style.h2}>{name}</h1>
                <div className={style.conteiner2}>
                    <h3>Steps: {steps.split('.').length}</h3>
                    <h3>HealthScore: {healthScore}</h3>
                </div>
                <div className={style.diets}>
                    <div>
                        <h3>•Vegan: {vegan === true ? '☑️' : '❌'}</h3>
                        <h3>•GlutenFree: {glutenFree === true ? '☑️' : '❌'}</h3>
                    </div>
                    <div>
                        <h3>•DairyFree: {dairyFree === true ? '☑️' : '❌'}</h3>
                        <h3>•Vegetarian : {vegetarian === true ? '☑️' : '❌'}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;