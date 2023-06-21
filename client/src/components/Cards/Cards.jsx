import Card from "./Card";
import s from "./Cards.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeByName } from "../../actions";
import Paginate from "../Paginate/Paginate";

export default function Cards({ currentPage, paginate, currentRecipes, recipesPerPage, recipes }) {
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState("");

  function handlerSetInputName(e) {
    setInputName(e.target.value);
  }
  function handlerSearchRecipe(e) {
    e.preventDefault();
    dispatch(searchRecipeByName(inputName));
  }

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

      <Paginate
        paginate={paginate}
        currentPage={currentPage}
        recipesNumber={recipes.length}
        recipesPerPage={recipesPerPage}
      />
      {currentRecipes.length === 1 ? (
        currentRecipes[0].error ? (
          <p>No se encontraron recetas con el nombre especificado</p>
        ) : (
          <div>
            <p> Pagina: {" " + currentPage}</p>
            <div className={s.divCards}>
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
          </div>
        )
      ) : (
        <div>
          <p> Pagina: {" " + currentPage}</p>
          <div className={s.divCards}>
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
        </div>
      )}
    </div>
  );
}
