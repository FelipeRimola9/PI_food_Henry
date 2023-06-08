import s from "./Card.module.css";
import { useHistory } from "react-router-dom";

export default function Card({name, summary, steps, diets, image, healthScore, id}){
  const history = useHistory();
  function handlerNavigate() {
    history.push(`/recipe/detail/${id}`);
  }
    return (
      <div
        className={s.cardContainer}
        onClick={() => {
          handlerNavigate();
        }}
      >
        <p>Nombre: {name}</p>
        <img className={s.img} src={image} alt="img not found" />
        <p>Nivel de plato saludable: {healthScore}</p>
        {diets.map((diet) => {
          return <p>{diet.name}</p>;
        })}
      </div>
    );
};
