import { GET_RECIPES, SEARCH_RECIPE, GET_RECIPE_ID, GET_DIETS } from "../actions/actionTypes";
const initialState={
    allRecipes: [],
    recipes: [],
    recipeId: {},
    diets: []
};
const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                allRecipes: action.payload,
                recipes: action.payload
            };
        case SEARCH_RECIPE:
            return {
                ...state,
                recipes: action.payload
            };
        case GET_RECIPE_ID:
            return {
                ...state,
                recipeId: action.payload
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        default:
            return state
    }
}
export default rootReducer