import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getRecipes, getRecipesByName, filterByOrigin, orderByHealthScore, orderByName, clearFilter } from '../../redux/actions'

import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from './home.module.css'

const Home = () => {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.allRecipes)
    console.log(allRecipes)
    const [search, setSearch] = useState('')

    const [currentPage, setCurrentPage] = useState(0);

    function handleChange(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getRecipesByName(search.charAt(0).toUpperCase() + search.slice(1)))
        setSearch('')
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    const handleOrder = (event) => {
        dispatch(orderByName(event.target.value));

        document.getElementById("orderHealthScore").value = "";

        setCurrentPage(1);
    };

    const handleOrderHealthScore = (event) => {
        dispatch(orderByHealthScore(event.target.value));

        document.getElementById("orderSelect").value = "";

        setCurrentPage(1);
    };

    const handleFilterOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value));

        document.getElementById("orderSelect").value = "";
        document.getElementById("orderHealthScore").value = "";

        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        dispatch(clearFilter());
    
        // Devuelve el valor de los select al origen
        document.getElementById("origin").value = "";
        document.getElementById("orderSelect").value = "";
        document.getElementById("orderHealthScore").value = "";

        setCurrentPage(1);
      };

    return (
        <div className={style.Home}>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

            <div className={style.navSelect}>

                <div className={style.cont}>
                    <label className={style.label} htmlFor="origin">Filter by Origin: </label>
                    <select className={style.select} name="origin" id="origin" defaultValue='--Select--' onChange={handleFilterOrigin}>
                        <option value=''>All Recipes</option>
                        <option value="API">In the page</option>
                        {/* <option value="NF">Sin filtro</option> */}
                        <option value="DB">Created by me</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <label className={style.label} htmlFor='orderSelect'>Order by Name: </label>
                    <select className={style.select} onChange={handleOrder} name='orderSelect' id='orderSelect' defaultValue='--Select--'>
                        <option value=''>--Select--</option>
                        <option value='A'>A-Z</option>
                        <option value='D'>Z-A</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <label className={style.label} htmlFor='orderHealthScore'>Order by HealthScore: </label>
                    <select className={style.select} onChange={handleOrderHealthScore} name='orderHealthScore' id='orderHealthScore' defaultValue='--Select--'>
                        <option value=''>--Select--</option>
                        <option value='A'>Min-Max</option>
                        <option value='D'>Max-Min</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <button onClick={handleClearFilters} className={style.cleanF}>Clean Filters</button>
                </div>

            </div>

            <Cards allRecipes={allRecipes} currentPage={currentPage} />

        </div>
    )
}

export default Home;