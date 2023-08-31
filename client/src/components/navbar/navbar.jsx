import SearchBar from "../searchbar/searchbar";
import style from './navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
//import { useDispatch } from 'react-redux'
//import image from '../../asets/5092154.png'
import image2 from '../../asets/6150d0cfaabb9b2fc29008ee0f8cf099-icono-de-trazo-de-comida-rapida-de-hamburguesa.png'
//import { filterByOrigin, orderByHealthScore, orderByName } from '../../redux/actions';

const Navbar = ({ handleChange, handleSubmit }) => {

    const location = useLocation();
    const navigate = useNavigate();
    //const dispatch = useDispatch()

    // const handleOrder = (event) => {
    //     dispatch(orderByName(event.target.value));
    // };

    // const handleOrderHealthScore = (event) => {
    //     dispatch(orderByHealthScore(event.target.value));
    // };

    // const handleFilterOrigin = (event) => {
    //     dispatch(filterByOrigin(event.target.value));
    // };

    const handleNavigateHome = () => {
        navigate('/home')
    }

    const handleNavigateLand = () => {
        navigate('/')
    }

    return (
        <div className={style.navbar}>

            <img onClick={handleNavigateLand} className={style.img} src={image2} alt="" />

            <div>
                <p onClick={handleNavigateHome} className={style.hf}>HenryFoods</p>
            </div>


            <div className={style.navbtnSearch}>
                {location.pathname === "/home" ? <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} /> : null}

            </div>

            <div className={style.btnCont}>
                <Link to={`/create`}>
                    {location.pathname === "/home" ? <button className={style.btnCreate}>New Recipe</button> : null}

                </Link>
            </div>

            {/* <div className={style.navSelect}>

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

                </div> */}

        </div>
    )
}

export default Navbar;