import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import s from "./Landing.module.css"; // Importa el archivo CSS

export default function Landing() {
  const navigate = useHistory();

  useEffect(() => {
    console.log("USE-EFFECT: LANDING");
  }, []);

  return (
    <div className={s.landingContainer}>
      <div className={s.container}>
        <span className={s.highlightedText}>PROYECTO INDIVIDUAL FOOD</span>
        <button className={s.buttonStart} onClick={() => { navigate.push('/home') }}>COMENZAR</button>
      </div>
    </div>
  );
}