import style from './searchbar.module.css'

const SearchBar = ({handleChange, handleSubmit}) => {
    return (
        <div className={style.SearchBar}>
            <form onChange={handleChange}>
                <input className={style.SearchSpace} placeholder="Search Recipe"/>
                <button className={style.SearchBtn} type='submit' onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;