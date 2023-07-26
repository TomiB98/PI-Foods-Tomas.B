import { useState } from 'react'
import style from './create.module.css'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux' 
import { addRecipe } from '../../redux/actions';

const Create = () => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        image: 'https://static.vecteezy.com/system/resources/previews/007/078/789/non_2x/fast-food-set-icons-fastfood-background-doodle-fast-food-icons-seamless-pattern-with-food-icons-food-icons-on-white-background-hand-drown-pattern-with-fast-food-icons-free-vector.jpg',
        name: '',
        summary: '',
        healthScore: '',
        steps: ''
    })

    const [error, setError] = useState({
        //image: '',
        name: 'Type recipe name',
        summary: 'Type recipe summary',
        healthScore: 'Type recipe healthScore',
        steps: 'Type recipe Steps'
    })

    function validate(input) {
        const error = {}
        if (input.name.length < 1) {
            error.name = 'The name is required!'
        }
        if (input.summary.length < 10) {
            error.summary = 'The is summary must be longer!'
        }
        if (input.steps.length < 10 && input.steps.includes('.') === false) {
            error.steps = 'The steps are  must be longer and must be separated by a dot!'
        }
        if (input.healthScore.length < 1) {
            error.healthScore = 'The healthScore is required!'
        }
        return error
    }

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value

        })
        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(addRecipe(input))
        alert('Recipe has been created succesfully, create one more or go back to home')
        setInput({
            name: '',
            //image: '',
            summary: '',
            healthScore: '',
            steps: '',
        })
    }

    return (
        <div>
            <h1>Create a Recipe!</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                {/* <div >
                    <label className={style.label}>Image: </label>
                    <input className={style.input} name='image' value={input.value} onChange={handleChange} placeholder='Insert Recipe Image' />
                </div> */}

                <div className={style.indiv}>
                    <label className={style.label}>Name: </label>
                    <input className={style.input} name='name' value={input.value} onChange={handleChange} placeholder='Type a Recipe Name' />
                    {error.name && <p className={style.errors}>{error.name}</p>}
                </div>

                <div className={style.indiv}>
                    <label className={style.label}>Summary: </label>
                    <input className={style.input} name='summary' value={input.value} onChange={handleChange} placeholder='Describe Recipe' />
                    {error.summary && <p className={style.errors}>{error.summary}</p>}
                </div>

                <div className={style.indiv}>
                    <label className={style.label}>HealthScore: </label>
                    <input className={style.input} name='healthScore' value={input.value} onChange={handleChange} placeholder='Insert healthScore' />
                    {error.healthScore && <p className={style.errors}>{error.healthScore}</p>}
                </div>

                <div className={style.indiv}>
                    <label className={style.label}>Steps: </label>
                    <input className={style.input} name='steps' value={input.value} onChange={handleChange} placeholder='Describe a Recipe Steps' />
                    {error.steps && <p className={style.errors}>{error.steps}</p>}
                </div>

                <div className={style.btn2}>
                    {error.name || error.summary || error.steps || error.healthScore ? null : <button className={style.btnSubmit} type='submit'>Submit</button>}
                    <Link to='/home'>
                        <button className={style.btnSubmit}>Home</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Create;