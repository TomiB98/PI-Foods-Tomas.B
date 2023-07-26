import SearchBar from "../searchbar/searchbar";
import style from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filterByOrigin, orderByHealthScore, orderByName } from '../../redux/actions';

const Navbar = ({ handleChange, handleSubmit }) => {

    const dispatch = useDispatch()

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
        <div className={style.navbar}>

            <div>
                <h1>Recipes</h1>
            </div>

            <div className={style.navbarLow}>

                <div className={style.navbtnSearch}>
                    <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />

                    <Link to={`/create`}>
                        <button className={style.btnCreate}>Create Recipe</button>
                    </Link>
                </div>

                <div className={style.navSelect}>

                    <div className={style.cont}>
                        <label className={style.label} htmlFor="origin">Filter by Origin</label>
                        <select className={style.select} name="origin" id="origin" defaultValue='--Select--' onChange={handleFilterOrigin}>
                            <option disabled>--Select--</option>
                            <option value="API">API</option>
                            <option value="NF">Sin filtro</option>
                            <option value="DB">BD</option>
                        </select>
                    </div>

                    <div className={style.cont}>
                        <label className={style.label} htmlFor='orderSelect'>Order by Name</label>
                        <select className={style.select} onChange={handleOrder} name='orderSelect' id='orderSelect' defaultValue='--Select--'>
                            <option disabled>--Select--</option>
                            <option value='A'>A-Z</option>
                            <option value='D'>Z-A</option>
                        </select>
                    </div>

                    <div className={style.cont}>
                        <label className={style.label} htmlFor='orderHealthScore'>Order by HealthScore</label>
                        <select className={style.select} onChange={handleOrderHealthScore} name='orderHealthScore' id='orderHealthScore' defaultValue='--Select--'>
                            <option disabled>--Select--</option>
                            <option value='A'>Min-Max</option>
                            <option value='D'>Max-Min</option>
                        </select>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Navbar;