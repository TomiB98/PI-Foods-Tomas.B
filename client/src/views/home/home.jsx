import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getRecipes, getRecipesByName } from '../../redux/actions'

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

    return (
        <div className={style.Home}>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
            <Cards allRecipes={allRecipes} />

        </div>
    )
}

export default Home;