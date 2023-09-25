import axios from 'axios'

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPES_BY_ID = 'GET_RECIPES_BY_ID';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const ADD_RECIPE = 'ADD_RECIPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const CLEAR_FILTER = 'CLEAR_FILTER';



// Obtiene todas las recetas

export function getRecipes() {
    return async function (dispatch) {
        const response = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: response.data
        })
    }
}

// Busca receta por nombre

export function getRecipesByName(name) {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/recipes/?name=${name}`)
        return dispatch({
            type: 'GET_RECIPES_BY_NAME',
            payload: response.data
        })
    }
}

// Busca la receta por el id para el Detail

export const getRecipeById = (id) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/recipes/${id}`);
        dispatch({
            type: 'GET_RECIPES_BY_ID',
            payload: response.data
        })
    }
}

// Limpia el detail para que no aparezca el visto anteriormente

export function clearDetail() {
    return { type: 'CLEAR_DETAIL' }
}

// Crea receta

export const addRecipe = (form) => {
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:3001/recipes`, form);
        return dispatch({
            type: 'ADD_RECIPE',
            payload: response.data,
        });
    };
};

//Filtros : por Nombre, HealthScore, Origen 

export const orderByName = (name) => {
    return {
        type: 'ORDER_BY_NAME',
        payload: name,
    };
};

export const orderByHealthScore = (healthScore) => {
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload: healthScore,
    };
};

export const filterByOrigin = (origin) => {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload: origin,
    };
};

export const filterByDiet = (diet) => {
    return {
        type: 'FILTER_BY_DIET',
        payload: diet,
    };
};

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER',
    };
}