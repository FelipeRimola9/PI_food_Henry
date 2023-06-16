import Cards from "../Cards/Cards.jsx";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, searchRecipeByName } from "../../actions";

export default function Home () {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)
  
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.msg?[]:recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  function paginate(number) {
    setCurrentPage(number);
  }

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  useEffect(() => {
    console.log("USE-EFFECT: HOME --currentRecipes", currentRecipes);
  }, [recipes, currentPage]);

    return (
      <div>
        <Navbar paginate={paginate} />

        {recipes.length === 0 ? (
          <p>Cargando recetas</p>
        ) : (
          <Cards
            currentPage={currentPage}
            paginate={paginate}
            currentRecipes={currentRecipes}
            recipesPerPage={recipesPerPage}
            recipes={recipes}
          />
        )}
      </div>
    );
};
