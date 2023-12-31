import { useState } from 'react'
import style from './create.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addRecipe } from '../../redux/actions';

const Create = () => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        image: null,
        name: '',
        summary: '',
        healthScore: '',
        vegan: '',
        glutenFree: '',
        dairyFree: '',
        vegetarian: '',
        steps: ''
    })

    const [error, setError] = useState({
        image: '',
        name: 'Type recipe name',
        summary: 'Type recipe summary',
        healthScore: 'Type recipe healthScore',
        steps: 'Type recipe Steps'
    })

    function validate(input) {
        const error = {}
        if (!input.image) {
            error.image = 'The image is required!'
        }
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
        if (event.target.name === "image") {
            const imageFile = event.target.files[0];
            // const imageUrl = URL.createObjectURL(imageFile);
            setInput({
                ...input,
                // image: imageUrl,
                image: imageFile,
            });
        } else {
            setInput({
                ...input,
                [event.target.name]: event.target.value,
            });
        }
        // setInput({
        //     ...input,
        //     [event.target.name]: event.target.value

        // })
        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleSelectDiet = (event, dietType) => {
        setInput({
            ...input,
            [dietType]: event.target.value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(addRecipe(input))

        setInput({
            name: '',
            image: '',
            summary: '',
            healthScore: '',
            vegan: '',
            glutenFree: '',
            dairyFree: '',
            vegetarian: '',
            steps: '',
        })

        alert('Recipe has been created succesfully')
    }

    return (
        <div className={style.card}>
            <h1>Create a Recipe!</h1>
            <form onSubmit={handleSubmit} className={style.formulario}>
                <div >
                    <div>
                        <label className={style.label}>•Image: </label>
                        {/* <input className={style.input} name='image' value={input.value} onChange={handleChange} placeholder='Insert Recipe Image' /> */}
                        <input
                            type="file" // Cambia el tipo de entrada a "file" para permitir la selección de imágenes
                            onChange={handleChange}// Llama a la función handleImageUpload cuando cambie la imagen
                            name="image"
                            accept="image/*" // Restringe la selección de archivos a imágenes solamente
                        />
                    </div>
                    {input.image && (
                        <img
                            // src={input.image}
                            src={URL.createObjectURL(input.image)}
                            alt=""
                            className={style.uploadedImage}
                        />
                    )}
                </div>
                {error.image && <p className={style.errors}>{error.image}</p>}

                <div className={style.indiv}>
                    <label className={style.label}>•Name: </label>
                    <input className={style.input} name='name' value={input.value} onChange={handleChange} placeholder='Type a Recipe Name' />
                </div>
                {error.name && <p className={style.errors}>{error.name}</p>}

                <div className={style.indiv}>
                    <label className={style.label}>•HealthScore: </label>
                    <input className={style.input} name='healthScore' value={input.value} onChange={handleChange} placeholder='Insert healthScore' />
                </div>
                {error.healthScore && <p className={style.errors}>{error.healthScore}</p>}

                <div className={style.indiv}>
                    <label className={style.label}>•Steps: </label>
                    <textarea className={style.inputLong} name='steps' value={input.value} onChange={handleChange} placeholder='Describe a Recipe Steps' />
                </div>
                {error.steps && <p className={style.errors}>{error.steps}</p>}

                <div className={style.indiv}>
                    <label className={style.label}>•Summary: </label>
                    <textarea className={style.inputLong} name='summary' value={input.value} onChange={handleChange} placeholder='Describe Recipe' />
                </div>
                {error.summary && <p className={style.errors}>{error.summary}</p>}

                <div className={style.pSelectCont}>
                    <p className={style.label}>•Diets:</p>
                    <div className={style.allSelectCont}>

                        <div className={style.selectIndv}>
                            <label >-Vegan-</label>
                            <select onChange={(event) => handleSelectDiet(event, 'vegan')} className={style.select} >
                                <option value=""> ┅ </option>
                                <option value='false'>✘</option>
                                <option value='true'>✔</option>
                            </select>
                        </div>

                        <div className={style.selectIndv}>
                            <label >-GlutenFree-</label>
                            <select onChange={(event) => handleSelectDiet(event, 'glutenFree')} className={style.select} >
                                <option value=""> ┅ </option>
                                <option value='false'>✘</option>
                                <option value='true'>✔</option>
                            </select>
                        </div>

                        <div className={style.selectIndv}>
                            <label >-DairyFree-</label>
                            <select onChange={(event) => handleSelectDiet(event, 'dairyFree')} className={style.select}>
                                <option value=""> ┅ </option>
                                <option value='false'>✘</option>
                                <option value='true'>✔</option>
                            </select>
                        </div>

                        <div className={style.selectIndv}>
                            <label >-Vegetarian-</label>
                            <select onChange={(event) => handleSelectDiet(event, 'vegetarian')} className={style.select} >
                                <option value=""> ┅ </option>
                                <option value='false'>✘</option>
                                <option value='true'>✔</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* <div className={style.btn2}> */}
                {error.name || error.summary || error.steps || error.healthScore ? null : <button className={style.btnSubmit} type='submit'>Submit</button>}
                {/* </div> */}
            </form>

            <NavLink to='/home' style={{ textDecoration: "none", color: "inherit" }}>
                <button className={style.btnSubmit}>Home</button>
            </NavLink>
        </div>
    )
}

export default Create;