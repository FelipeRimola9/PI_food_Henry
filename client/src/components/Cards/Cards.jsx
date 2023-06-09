import Card from "./Card";
import s from "./Cards.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, searchRecipeByName } from "../../actions";
import Paginate from "../Paginate/Paginate";

export default function Cards() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [inputName, setInputName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
function paginate (number) {
  setCurrentPage(number)
}


  function handlerSetInputName(e) {
    setInputName(e.target.value);
  }
  function handlerSearchRecipe(e) {
    e.preventDefault();
    dispatch(searchRecipeByName(inputName));
  }
  useEffect(() => {
    // dispatch(getRecipes());
  }, []);
  useEffect(() => {
    console.log("USE EFFECT - RECIPES:", recipes);
  }, [recipes, currentPage]);

  return (
    <div className={s.container}>
      <div>
        <input
          onChange={(e) => {
            handlerSetInputName(e);
          }}
          type="text"
          placeholder="Busca una receta"
        />
        <button onClick={(e) => handlerSearchRecipe(e)}>Buscar</button>
      </div>

      <Paginate paginate={paginate} currentPage={currentPage} 
      recipesNumber={recipes.length} recipesPerPage={recipesPerPage}/>

      {currentRecipes?.map((recipe) => {
        return (
          <Card
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            steps={recipe.steps}
            healthScore={recipe.healthScore}
            diets={recipe.diets}
            summary={recipe.summary}
          />
        );
      })}
    </div>
  );
}
