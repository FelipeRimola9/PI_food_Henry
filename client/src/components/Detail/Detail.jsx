import { useParams } from "react-router-dom"
import { getRecipeById } from "../../actions";
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux";
import { isUUID } from "validator"
import { useHistory } from "react-router-dom"
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = useSelector((state) => state.recipeId);
  const flag = isUUID(id);
  const history = useHistory();


  function handlerNavigate(e) {
    e.preventDefault();
    history.push("/home");
  }

  
  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);
  useEffect(() => {
    console.log("RECIPE ID: ", recipeId);
    // newDescription = recipeId?.description?.replaceAll(/<[^>]+>/g, "")
    // console.log("--newDescription: ",newDescription);
  }, [recipeId]);

  return recipeId.name ? (
    <div>
      <button onClick={(e) => handlerNavigate(e)}>Volver</button>
      <p>Id: {recipeId.id}</p>
      <p>Nombre: {recipeId.name}</p>
      <p>Resumen: {recipeId.summary?.replaceAll(/<[^>]+>/g, "")}</p>
      <p>Nivel de saludable: {recipeId.healtScore}</p>
      <div>
        <p>Dietas:</p>
        {flag
          ? recipeId?.diets?.map((diet) => <p>{diet.name}</p>)
          : recipeId?.diets?.map((diet) => <p>{diet}</p>)}
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