import { useParams } from "react-router-dom"
import { getRecipeById } from "../../actions";
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux";
import { isUUID } from "validator"
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = useSelector((state) => state.recipeId);
  const flag = isUUID(id);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);
  useEffect(() => {
    console.log("RECIPE ID: ", recipeId);
  }, [recipeId]);
  //{name, summary, steps, diets, image, healthScore, id}
  return recipeId.name ? (
    <div>
      <p>Id: {recipeId.id}</p>
      <p>Nombre: {recipeId.name}</p>
      <p>Resumen: {recipeId.summary}</p>
      <p>Nivel de saludable: {recipeId.healtScore}</p>
      <div>
        <p>Dietas:</p>
        {flag
          ? recipeId?.diets?.map((diet) => <p>{diet.name}</p>)
          : recipeId?.diets?.map((diet) => <p>{diet}</p>)
          }
      </div>
      <div>
        <p>Pasos:</p>
        {recipeId?.steps?.map((step) => (
          <p>{step}</p>
        ))}
      </div>
      <img src={recipeId.image} alt="img not found" />
    </div>
  ) : (
    <p>Cargando receta..</p>
  );
}