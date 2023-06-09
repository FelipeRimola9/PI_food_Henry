import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


export default function FormCreateRecipe() {
const dispatch = useDispatch();
const history = useHistory();

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

function handlerChange(e) {
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });
};

function validate(e) {
e.preventDefault();
if(input.name.trim() === "") {
    errors.name = "Debes ingresar un nombre";
} else {
    errors.name = ""
}
if(input.healthScore === 0) {
    errors.healthScore = "Debes indicar el nivel de saludable del plato"
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
useEffect(()=>{
    console.log("Rendering - FormCreate");
},[])
    return (
        <div>
            <h1>Form</h1>
        </div>
    )
}