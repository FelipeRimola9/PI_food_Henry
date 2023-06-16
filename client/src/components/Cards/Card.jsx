import s from "./Card.module.css";
import { useHistory } from "react-router-dom";
import { isUUID } from "validator"


export default function Card({name, summary, steps, diets, image, healthScore, id}){
  const history = useHistory();
  function handlerNavigate() {
    history.push(`/recipe/detail/${id}`);
  }
  let isDbRecipe = isUUID(id.toString());
  
    return (
      <div
        className={s.cardContainer}
        onClick={() => {
          handlerNavigate();
        }}
      >
        <p className={s.name}>
         {name.length > 25 ? name.slice(0, 25) + "..." : name}
        </p>
        <img className={s.img} src={image} alt="img not found" />
        <div className={s.divHealthScore}>
          <img className={s.iconHealth}
            src="https://e7.pngegg.com/pngimages/744/826/png-clipart-green-cross-with-leaf-logo-health-care-medicine-icon-green-healthcare-icon-leaf-camera-icon.png"
            alt="img not found"
          />
          <p >{healthScore}</p>
        </div>
        <div className={s.diets}>
          {isDbRecipe
            ? diets.map((diet) => {
                return <p className={s.dietName}>{diet.name}</p>;
              })
            : diets.map((diet) => {
                return <p className={s.dietName}>{diet}</p>;
              })}
        </div>
      </div>
    );
};
