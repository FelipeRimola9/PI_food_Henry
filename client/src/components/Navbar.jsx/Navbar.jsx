import s from "./Navbar.module.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDietsFromDb } from "../../actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState("");
  const diets = useSelector((state)=>state.diets);

  function handlerChangeFilterValue() {
    setFilterValue()
  };
  useEffect(() => {
    dispatch(getDietsFromDb());
  }, []);

  useEffect(()=>{
    console.log("Rendering comp Navbar", diets);
  },[diets])
  return (
    <div className={s.navbarContainer}>
      <select name=""onChange={()=>{handlerChangeFilterValue()}}>
        <option value="default"name="">Filtra por dietas</option>
        {
          diets.length !== 0
          ? diets?.map((diet)=> <option value={diet.name}key={diet.id}>{diet.name}</option> )
          : null
        }
      </select>
    </div>
  );
}