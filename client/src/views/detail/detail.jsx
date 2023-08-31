import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from "react-router-dom";
import { getRecipeById, clearDetail } from '../../redux/actions'
import style from './detail.module.css'

const Detail = () => {

    const myRecipe = useSelector((state) => state.recipeDetail)
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(myRecipe)

    useEffect(() => {
        dispatch(getRecipeById(id))
        return dispatch(clearDetail())
    }, [dispatch, id])


    return (
        <div >
            <div className={style.contP}>
                <h1 className={style.h1}>{myRecipe.name}</h1>
                <div className={style.cont}>
                    <img src={myRecipe.image} alt="" />
                    <div>
                        <h1 className={style.h1D}>Diets</h1>
                        <h2>•Vegan: {myRecipe.vegan === true ? '☑️' : '❌'}</h2>
                        <h2>•GlutenFree: {myRecipe.glutenFree === true ? '☑️' : '❌'}</h2>
                        <h2>•DairyFree: {myRecipe.dairyFree === true ? '☑️' : '❌'}</h2>
                        <h2>•Vegetarian : {myRecipe.vegetarian === true ? '☑️' : '❌'}</h2>
                    </div>
                </div>
            </div>

            <div className={style.cont2}>
                <div className={style.text}>
                    <h2>Summary:</h2>
                    <p>{myRecipe.summary}</p>
                    <h2>Steps:</h2>
                    <p>{myRecipe.steps}</p>
                </div>
                <NavLink to={'/home'} style={{ textDecoration: "none", color: "inherit" }}>
                    <button className={style.btnHome}>Home</button>
                </NavLink>
            </div>
            
        </div>

    )
}

export default Detail;