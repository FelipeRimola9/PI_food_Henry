import { useHistory } from "react-router-dom";
import { useEffect } from "react";
export default function Landing(){
    const navigate=useHistory();

    useEffect(()=>{
        console.log("USE-EFFECT: LANDING");
    },[])
    return (
    <div>
        Landing
        <button onClick={()=>{navigate.push('/home')}}>Inicio</button>
    </div>
    )
};
