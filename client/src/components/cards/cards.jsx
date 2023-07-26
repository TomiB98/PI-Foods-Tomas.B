import Card from '../card/card'
import style from './cards.module.css'
import { Pagination } from '../pagination/pagination'
import { useSelector } from 'react-redux';
import { useState } from "react";

const Cards = () => {

    const allRecipes = useSelector((state) => state.allRecipes)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8) //8

    const maximo = allRecipes ? allRecipes.length / perPage : 0;
    // if (!allRecipes) {
    //     return <div>...LOADING...</div>
    // }



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

export default Cards;