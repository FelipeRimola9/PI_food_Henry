import s from "./Navbar.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import {
  getDietsFromDb,
  filterRecipesByDiet,
  filterRecipesByOrigin,
  orderAlfabeticAsc,
  orderAlfabeticDes,
  orderHealthScoreAsc,
  orderHealthScoreDes,
  resetRecipes,
} from "../../actions";

export default function Navbar({ paginate }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const history = useHistory();
  function handlerNavigateCreateForm(e) {
    e.preventDefault();
    history.push(`/createRecipe`);
  }

  function handlerFilterValue(e) {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
    paginate(1)
  }
  function handlerFilterOrigin(e) {
    console.log("e.target.value: ", e.target.value);
    dispatch(filterRecipesByOrigin(e.target.value));
    paginate(1)
  }
  function handlerOrderAlf(e) {
    if (e.target.value !== "default") {
      if (e.target.value === "asc") {
        dispatch(orderAlfabeticAsc());
        e.target.value = "default";
        paginate(1)
      } else {
        dispatch(orderAlfabeticDes());
        e.target.value = "default";
        paginate(1)
      }
    }
  }
  function handlerOrderHealthScore(e) {
    if (e.target.value !== "default") {
      if (e.target.value === "max") {
        dispatch(orderHealthScoreAsc());
        e.target.value = "default";
        paginate(1)
      } else {
        dispatch(orderHealthScoreDes());
        e.target.value = "default";
        paginate(1)
      }
    }
  }
  function handlerReset(e) {
    e.preventDefault();
    dispatch(resetRecipes())
    paginate(1)
  }
  function handlerNavigateLanding(e) {
    e.preventDefault();
    history.push("/");
  }
  useEffect(() => {
    dispatch(getDietsFromDb());
  }, []);

  useEffect(() => {
    console.log("Rendering comp Navbar", diets);
  }, [diets]);

  return (
    <div className={s.navbarContainer}>
      <div className={s.divBtns}>
      <button onClick={(e)=>handlerNavigateLanding(e)}>Volver al Landing</button>
      <button onClick={(e)=>handlerReset(e)}>Todas las recetas</button>
      <button onClick={(e) => handlerNavigateCreateForm(e)}>
        Crear Receta
      </button>
      </div>

      <div className={s.divSelects}>
      <select onChange={(e) => handlerFilterValue(e)}>
        <option value="default">Filtra por dietas</option>
        {diets.length !== 0
          ? diets?.map((diet) => (
            <option value={diet.name} key={diet.id}>
                {diet.name}
              </option>
            ))
            : null}
      </select>

      <select onChange={(e) => handlerFilterOrigin(e)}>
        <option value="default">Filtra por origen DB o Api</option>
        <option value={true}>DB</option>
        <option value={false}>API</option>
      </select>

      <select onChange={(e) => handlerOrderAlf(e)}>
        <option value="default">Orden Alfabetico</option>
        <option value="asc">Ascendente</option>
        <option value="des">Descendente</option>
      </select>

      <select onChange={(e) => handlerOrderHealthScore(e)}>
        <option value="default">Orden por Health Score</option>
        <option value="max">Max</option>
        <option value="min">Min</option>
      </select>
      </div>
    </div>
  );
}

