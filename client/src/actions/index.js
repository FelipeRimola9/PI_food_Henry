import axios from "axios"
import { HOST } from "../utils";
import { GET_RECIPES,
    SEARCH_RECIPE,
    GET_RECIPE_ID,
    GET_DIETS,
    FILTER_BY_DIET,
    FILTER_ORIGIN,
    ORDER_ALFABETIC_ASC,
    ORDER_ALFABETIC_DES,
    ORDER_HEALTHSCORE_ASC,
    ORDER_HEALTHSCORE_DES,
    POST_RECIPE,
    RESET_RECIPES } from "./actionTypes";

export function getRecipes() {
    return async function(dispatch) {
        try {
            const json = await axios.get(`${HOST}/recipes`);
            dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function searchRecipeByName(name) {
    return async function (dispatch) {
        try {
            console.log("ACTION SEARCH: NAME VALUE: ",name);
            const json = await axios.get(`${HOST}/recipes/name?name=${name}`);
            
            dispatch({
                type: SEARCH_RECIPE,
                payload: json.data 
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getRecipeById(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${HOST}/recipes/${id}`);
            dispatch({
                type: GET_RECIPE_ID,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDietsFromDb() {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${HOST}/diets`);
            dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function filterRecipesByDiet(diet) {
    return async function (dispatch) {
        try {
            dispatch({
                type: FILTER_BY_DIET,
                payload: diet
            }) 
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterRecipesByOrigin(value) {
    return async function (dispatch) {
        try {
            dispatch({
                type: FILTER_ORIGIN,
                payload: value
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function orderAlfabeticAsc() {
    return async function (dispatch) {
        try {
            dispatch({
                type: ORDER_ALFABETIC_ASC,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderAlfabeticDes() {
    return async function (dispatch) {
        try {
            dispatch({
                type: ORDER_ALFABETIC_DES
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function orderHealthScoreAsc() {
    return async function (dispatch) {
        try {
            dispatch({
                type: ORDER_HEALTHSCORE_ASC
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function orderHealthScoreDes() {
    return async function (dispatch) {
        try {
            dispatch({
                type: ORDER_HEALTHSCORE_DES
            })
        } catch (error) {
            console.log(error);
        }
    }    
};

export function postRecipeIntoDB(input) {
    return async function (dispatch) {
        try {
            await axios.post(`${HOST}/recipes`, input);
            dispatch({
                type: POST_RECIPE
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function resetRecipes() {
    return async function (dispatch) {
        try {
            dispatch({
                type: RESET_RECIPES
            })
        } catch (error) {
            console.log(error);
        }
    }
}