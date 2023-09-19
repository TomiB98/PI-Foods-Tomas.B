import Card from '../card/card'
import style from './cards.module.css'
import { Pagination } from '../pagination/pagination'
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";

const Cards = ({ currentPage }) => {

    const allRecipes = useSelector((state) => state.allRecipes)

    const [page, setPage] = useState(currentPage || 1)
    const [perPage, setPerPage] = useState(6) //8

    const maximo = allRecipes ? allRecipes.length / perPage : 0;
    // if (!allRecipes) {
    //     return <div>...LOADING...</div>
    // }

    useEffect(() => {
        // Update the local 'page' state when 'currentPage' prop changes
        setPage(currentPage || 1);
      }, [currentPage]);

    return (
        <div >

            <div className={style.cards}>
                {
                    allRecipes.slice(
                        (page - 1) * perPage,
                        (page - 1) * perPage + perPage
                    ).map(recipe => {
                        return <Card
                            key={recipe.idApi}
                            id={recipe.idApi}
                            name={recipe.name}
                            healthScore={recipe.healthScore}
                            steps={recipe.steps}
                            image={recipe.image}
                            vegan={recipe.vegan} 
                            glutenFree={recipe.glutenFree} 
                            dairyFree={recipe.dairyFree} 
                            vegetarian={recipe.vegetarian}
                        />
                    })
                }
                <div>


                </div>
                <Pagination page={page} setPage={setPage} maximo={maximo} />
            </div>
        </div>

    )
}
//page={page} setPage={setPage} maximo={maximo}
export default Cards;