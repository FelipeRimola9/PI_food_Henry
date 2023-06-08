import axios from "axios"
import { HOST } from "../utils";
import { GET_RECIPES, SEARCH_RECIPE, GET_RECIPE_ID, GET_DIETS } from "./actionTypes";

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
}