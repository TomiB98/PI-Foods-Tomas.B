import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getRecipes, getRecipesByName, filterByOrigin, orderByHealthScore, orderByName } from '../../redux/actions'

import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from './home.module.css'

const Home = () => {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.allRecipes)
    const [search, setSearch] = useState('')

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
    };

    const handleOrderHealthScore = (event) => {
        dispatch(orderByHealthScore(event.target.value));
    };

    const handleFilterOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value));
    };

    return (
        <div className={style.Home}>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

            <div className={style.navSelect}>

                <div className={style.cont}>
                    <label className={style.label} htmlFor="origin">Filter by Origin: </label>
                    <select className={style.select} name="origin" id="origin" defaultValue='--Select--' onChange={handleFilterOrigin}>
                        <option disabled>--Select--</option>
                        <option value="API">API</option>
                        <option value="NF">Sin filtro</option>
                        <option value="DB">BD</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <label className={style.label} htmlFor='orderSelect'>Order by Name: </label>
                    <select className={style.select} onChange={handleOrder} name='orderSelect' id='orderSelect' defaultValue='--Select--'>
                        <option disabled>--Select--</option>
                        <option value='A'>A-Z</option>
                        <option value='D'>Z-A</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <label className={style.label} htmlFor='orderHealthScore'>Order by HealthScore: </label>
                    <select className={style.select} onChange={handleOrderHealthScore} name='orderHealthScore' id='orderHealthScore' defaultValue='HealthScore'>
                        <option value=''>HealthScore</option>
                        <option value='A'>Min-Max</option>
                        <option value='D'>Max-Min</option>
                    </select>
                </div>

                <div className={style.cont}>
                    <button className={style.cleanF}>Clean Filters</button>
                </div>

            </div>

            <Cards allRecipes={allRecipes} />

        </div>
    )
}

export default Home;