import React, { useState, useEffect } from "react";
import s from "./FormCreateRecipe.module.css"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDietsFromDb } from "../../actions";
import { postRecipeIntoDB } from "../../actions";

export default function FormCreateRecipe() {
const dispatch = useDispatch();
const history = useHistory();
const diets = useSelector((state)=>state.diets)

const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [],
    diets: [],
    image: ""
})
const errors = {
  name: "",
  summary: "",
  healthScore: "",
  steps: "",
  diets: "",
  image: "",
};

function handlerChangeInput(e, step) {
    e.preventDefault();
    if(e.target.name === "diets") {
        console.log("CASO DIETS");
        console.log("--diets: ", input.diets);
        if(e.target.value !== "default") {
          if(!input.diets.includes(e.target.value)) {
              setInput({
                ...input,
                [e.target.name]: [...input.diets, e.target.value],
              });   
          };
        }
    } 
    if(e.target.name === "steps") {
        let steps = input.steps
        console.log("CASO STEPS : --steps", steps);
        steps[step]= e.target.value;
        setInput({
            ...input,
            steps: steps
        });
    } 
    if(e.target.name === "healthScore") {
      if(e.target.value <= 100 && e.target.value >= 0) {
        console.log("CASO SI");
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });      
      } else {
        alert("El nivel de saludable debe ser entre 0 y 100!")
      }
    }

    if(e.target.name === "name"){
      let regex = /^[a-zA-Z\s]+$/;
      if(e.target.value.trim() === ""){
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
      if (regex.test(e.target.value.trim())) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
    };

    if(e.target.name === "summary" || 
       e.target.name === "image") {
        console.log("CASO DEFAULT");
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
};

function validate() {

if(input.name.trim() === "") {
    errors.name = "Debes ingresar un nombre";
} else {
    errors.name = ""
}
if(input.healthScore > 100 && input.healthScore  < 0) {
    errors.healthScore = "El nivel de saludable debe ser entre 0 y 100"
} else {
    errors.healthScore = "";
}
if(input.summary === "") { 
    errors.summary = "Debes escribir un resumen del plato"
} else {
    errors.summary = ""
}
if(input.image === "") {
    errors.image = "Debes cargar una imagen para el plato";
} else {
    errors.image = ""
}
if(input.steps.length === 0) {
    errors.steps = "Debes escribir al menos un paso para el plato"
} else {
    errors.steps = ""
}
if(input.diets.length === 0) {
    errors.diets = "Debes indicar al menos una dieta"
} else {
    errors.diets = ""
}
}

let [currentPagesSteps, setCurrentPagesSteps] = useState([]);
function handlerAddSteps(e) {
    e.preventDefault();
    setCurrentPagesSteps([...currentPagesSteps, currentPagesSteps.length])
}

function handlerPostRecipe(e) {
  e.preventDefault();
  validate();
  if (
    errors.name !== "" ||
    errors.summary !== "" ||
    errors.image !== "" ||
    errors.healthScore !== "" ||
    errors.steps !== "" ||
    errors.diets !== ""
  ) {
    alert(
      errors.name ||
        errors.summary ||
        errors.image ||
        errors.healthScore ||
        errors.steps ||
        errors.diets
    );
  } else {
    // console.log("CASO NO HAY ERRORES - POSTEAR RECETA");
    let newObj = {...input, name: input.name.trim()}
    dispatch(postRecipeIntoDB(newObj));
    alert("Se ha creado la receta con éxito!")
    history.push("/home");
  }
}
function handlerNavigate(e) {
  e.preventDefault();
  history.push("/home");
};
function handlerSubtractDiet(e) {
  if(input.diets.includes(e.target.value)) {
    // console.log("HANDLER SUBTRACT: --e.target.value", e.target.value);
    let index = input.diets.indexOf(e.target.value);
    console.log(index);
    let firstPart = input.diets.slice(0, index);
    let secondPart = input.diets.slice(index+1);
    let newDiets = [...firstPart, ...secondPart];
    // console.log("NEW DIETS: ",newDiets);
    setInput({
      ...input,
      diets: newDiets
    })
  };
};



useEffect(()=>{
},[currentPagesSteps])

useEffect(()=>{
    dispatch(getDietsFromDb())
},[])

useEffect(()=>{
    console.log("INPUT: ",input);
},[input])
    return (
      <div className={s.divContainer}>
        <div className={s.container}>

        <button onClick={(e)=>handlerNavigate(e)}>Volver</button>
        <div>
          <div>
            <label>Nombre </label>
            <input
              name="name"
              value={input.name}
              type="text"
              onChange={(e) => handlerChangeInput(e)}
              />
          </div>

          <div>
            <label>Nivel de saludable </label>
            <input
              name="healthScore"
              value={input.healthScore}
              type="number"
              onChange={(e) => handlerChangeInput(e)}
              />
          </div>

          <div>
            <label>Resumen del plato </label>
            <textarea name="summary" onChange={(e) => handlerChangeInput(e)} />
          </div>

          <div>
            <label>Imagen </label>
            <input
              name="image"
              type="text"
              onChange={(e) => handlerChangeInput(e)}
              />
          </div>

          <select name="diets" onChange={(e) => handlerChangeInput(e)}>
            <option value="default">Selecciona las dietas</option>
            {diets?.map((diet) => (
              <option value={diet.name}>{diet.name}</option>
              ))}
          </select>
        </div>

        <div>
          <button onClick={(e) => handlerAddSteps(e)}>Agregar Pasos</button>
          <div>
          {
            currentPagesSteps.map((step) => <input name="steps" ind={step} onChange={(e) => handlerChangeInput(e, step)}/>)
          }
          </div>
        </div>
        <button onClick={(e)=>handlerPostRecipe(e)}>Crear receta</button>
        </div>
        <div className={s.divCurrentDiets}>
          {
            input.diets.length
            ? input.diets.map((diet) => 
            <div className={s.diet}>
              <p>{diet}</p>
              <button value={diet}onClick={(e) =>handlerSubtractDiet(e)}>X</button>
            </div> )
            : null
          }
        </div>
      </div>
    );
}