import { GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPES_BY_ID, CLEAR_DETAIL, ADD_RECIPE, ORDER_BY_NAME, ORDER_BY_HEALTHSCORE, FILTER_BY_ORIGIN, CLEAR_FILTER } from '../redux/actions'

let initialState = {
    allRecipes: [],
    allRecipesCopy: [],
    createRecipe: [],
    filteredRecipes: [],
    filteredRecipesCopy: [],
    recipeDetail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                allRecipes: action.payload,
                allRecipesCopy: action.payload,
                filteredRecipes: action.payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                allRecipes: action.payload,
            }
        case GET_RECIPES_BY_ID:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                recipeDetail: {}
            }
        case ADD_RECIPE:
            return {
                ...state,
                allRecipes: [...state.allRecipes, action.payload],
                createRecipe: [...state.createRecipe, action.payload],
            }

        case FILTER_BY_ORIGIN:

            if (action.payload === "") {
                return {
                    ...state,
                    allRecipes: state.allRecipesCopy,
                    filteredRecipes: state.allRecipesCopy,
                };
            }

            if (action.payload === "DB") {
                return {
                    ...state,
                    allRecipes: state.allRecipesCopy.filter((recipe) => typeof recipe.idApi === 'string'
                    ),
                    filteredRecipes: state.allRecipesCopy.filter((recipe) => typeof recipe.idApi === 'string'
                    ),
                };
            };

            if (action.payload === "API") {
                return {
                    ...state,
                    allRecipes: state.allRecipesCopy.filter((recipe) => typeof recipe.idApi === 'number'
                    ),
                    filteredRecipes: state.allRecipesCopy.filter((recipe) => typeof recipe.idApi === 'number'
                    ),
                };
            };

        // const origin = [...state.allRecipes];
        // const originCopy = [...state.allRecipes]
        // const originApi = origin.filter((recipe) => { if (isNaN(recipe.idApi) === false) return recipe })
        // const originDB = originCopy.filter((recipe) => { if (isNaN(recipe.idApi) === true) return recipe })
        // let aux

        // // Filtra las recetas según el origen proporcionado en la acción ("API" o "DB").

        // if (action.payload === 'API') {
        //     aux = originApi
        // } else if (action.payload === 'DB') {
        //     aux = originDB
        // }

        // // Devuelve el estado actualizado con las recetas filtradas por origen.
        // return {
        //     ...state,
        //     allRecipes: action.payload === 'NF' ? [...state.allRecipesCopy] : aux
        // };

        case ORDER_BY_NAME:
            if (action.payload === "") {
                return {
                    ...state,
                    allRecipes: state.filteredRecipes,
                };
            }
            // Crea una copia de las recetas para ordenarlas sin afectar la original.
            let allRecipesCopy = [...state.allRecipes];
            // Ordena las recetas por nombre de manera ascendente o descendente según el valor proporcionado en la acción.
            if (action.payload === "A") {
                allRecipesCopy.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (action.payload === "D") {
                allRecipesCopy.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();

                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }

                    return 0;
                });
            } else {
                // Si el valor proporcionado no es válido, mantiene el estado sin cambios.
                allRecipesCopy = [...state.filteredRecipes];
            }
            // Devuelve el estado actualizado con las recetas ordenadas.
            return {
                ...state,
                allRecipes: allRecipesCopy,
            };

        case ORDER_BY_HEALTHSCORE:
            if (action.payload === "") {
                return {
                    ...state,
                    allProducts: state.filteredProducts,
                };
            }
            // Crea una copia de las recetas para ordenarlas sin afectar la original
            let recipesOrdered = [...state.allRecipes];

            // Ordena las recetas por puntuación de salud (healthScore) de manera ascendente o descendente según el valor proporcionado en la acción.
            if (action.payload === "A") {
                recipesOrdered.sort((a, b) => a.healthScore - b.healthScore);
            } else if (action.payload === "D") {
                recipesOrdered.sort((a, b) => b.healthScore - a.healthScore);
            } else {
                // Si el valor proporcionado no es válido, mantiene el estado sin cambios.
                recipesOrdered = [...state.filteredRecipes];
            }

            // Devuelve el estado actualizado con las recetas ordenadas por puntuación de salud.
            return {
                ...state,
                allRecipes: recipesOrdered,
            };

        case CLEAR_FILTER:
            return {
                ...state,
                allRecipes: state.allRecipesCopy,
            };


        default:
            return state

    }
}

export default rootReducer;