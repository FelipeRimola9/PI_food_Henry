import Cards from "../Cards/Cards.jsx";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx/Navbar.jsx";

export default function Home () {

    useEffect(()=>{
        console.log("USE-EFFECT: HOME");

    },[])

    return (
      <div>
        <Navbar />
        <Cards />
      </div>
    );
};
