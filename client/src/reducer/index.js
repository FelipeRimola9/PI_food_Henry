import { GET_RECIPES,
    SEARCH_RECIPE,
    GET_RECIPE_ID,
    GET_DIETS,
    FILTER_BY_DIET,
    FILTER_ORIGIN,
    ORDER_ALFABETIC_ASC,
    ORDER_ALFABETIC_DES,
    ORDER_HEALTHSCORE_ASC,
    ORDER_HEALTHSCORE_DES } from "../actions/actionTypes";
import { isUUID } from "validator";

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
            };
        case FILTER_BY_DIET: 
        const filterRecipes = state.allRecipes.filter((recipe)=>{
        // Creo 2 variables, una para saber si la receta es de la DB o de la API (flag) 
        // La otra variable (flag2) es para saber si debo pushear la receta al array resultante.
                let flag = isUUID(recipe.id.toString());
                let flag2 = false;
            if(flag) {
                // Este es el caso que tengo que buscar filtrar y la receta es de la DB.
                //En el forEach de abajo ↓↓ lo que hago es buscar si en las dietas de la receta está la dieta que busco.
                // Si está la dieta entonces flag2 pasa a ser true.
                recipe.diets.forEach((diet)=>{
                    if(diet.name === action.payload) {
                        flag2 = true
                    }
                });
            // Acá pregunto por flag2 para saber si pusheo la receta o no, retornandole al filter true o false
            if(flag2) {
                return true
            } else {
                return false
            }
            } else {
                // Este es el caso que tengo que buscar filtrar y la receta es de la API.
                //En el forEach de abajo ↓↓ lo que hago es buscar si en las dietas de la receta está la dieta que busco.
                // Si está la dieta entonces flag2 pasa a ser true.
                recipe.diets.forEach((diet)=>{
                    if(diet === action.payload) {
                        flag2 = true
                    }
                });
                if(flag2) {
                    return true
                } else {
                    return false
                }
            };
            });
            return {
                ...state,
                recipes: filterRecipes
            }
        case FILTER_ORIGIN:
            let  filteredRecipes = []
            if(action.payload === "true") {
                filteredRecipes = state.allRecipes.filter((recipe)=>{
                    let flag = isUUID(recipe.id.toString());
                    if(flag) {
                        return true
                    } else {
                        return false
                    }
                })
            } else {
                filteredRecipes = state.allRecipes.filter((recipe)=>{
                    let flag = isUUID(recipe.id.toString());
                    if(flag) {
                        return false
                    } else {
                        return true
                    }
                })
            };
            return {
                ...state,
                recipes: filteredRecipes
            };
        case ORDER_ALFABETIC_ASC:
            let ascArray = state.recipes.map((e) => e)
              .sort((a, b) => {
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                  } else {
                    return -1;
                  }
                });
            return {
                ...state,
                recipes: ascArray
            };
        case ORDER_ALFABETIC_DES: 
            let desArray = state.recipes.map((e) => e)
              .sort((a, b) => {
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                  } else {
                    return 1;
                  }
                });
            return {
                ...state,
                recipes: desArray
            };
        case ORDER_HEALTHSCORE_ASC:
            let orderArrayAsc = state.recipes
                .map((e) => e)
                .sort((a, b) => {
                  if (Number(a.healthScore) > Number(b.healthScore)) {
                    return -1;
                  }
                  if (Number(a.healthScore) === Number(b.healthScore)) {
                    return 0;
                  }
                  if (Number(a.healthScore) < Number(b.healthScore)) {
                    return 1;
                  }
                });
            return {
                ...state,
                recipes: orderArrayAsc
            };
        case ORDER_HEALTHSCORE_DES:
            let orderArrayDes = state.recipes
                .map((e) => e)
                .sort((a, b) => {
                  if (Number(a.healthScore) > Number(b.healthScore)) {
                    return 1
                  }
                  if (Number(a.healthScore) === Number(b.healthScore)) {
                    return 0;
                  }
                  if (Number(a.healthScore) < Number(b.healthScore)) {
                    return -1;
                  }
                });
            return {
                ...state,
                recipes: orderArrayDes
            };
            default:
                return state
    }
}
export default rootReducer