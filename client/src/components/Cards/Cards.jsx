import Card from "./Card";
import s from "./Cards.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, searchRecipeByName } from "../../actions";

export default function Cards() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [inputName, setInputName] = useState("");

  function handlerSetInputName(e) {
    setInputName(e.target.value);
  }
  function handlerSearchRecipe(e) {
    e.preventDefault();
    dispatch(searchRecipeByName(inputName));
  }
  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  useEffect(() => {
    console.log("USE EFFECT - RECIPES:", recipes);
  }, [recipes]);

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

      {recipes?.map((recipe) => {
        return (
          <Card
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            steps={recipe.steps}
            healtScore={recipe.healtScore}
            diets={recipe.diets}
            summary={recipe.summary}
          />
        );
      })}
    </div>
  );
}
