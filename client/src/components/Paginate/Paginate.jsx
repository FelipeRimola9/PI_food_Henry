import { useEffect } from "react"
import s from "./Paginate.module.css"
export default function Paginate({ recipesNumber, paginate, currentPage, recipesPerPage }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(recipesNumber/recipesPerPage); i++) {
        pageNumbers.push(i);
    };
function handlerPrevious(e) {
    e.preventDefault();
    paginate(currentPage-1)
}
function handlerNext(e) {
    e.preventDefault();
    paginate(currentPage+1)
}
useEffect(()=>{
},[currentPage])
  return (
    <div className={s.divContainer}>
        {
            currentPage > 1 
            ? <div>
                <button onClick={(e)=>{handlerPrevious(e)}}>Anterior</button>
              </div>
            : null
        }
        {
        pageNumbers && pageNumbers.map((number)=> (
         currentPage===number
         ? <button className="buttonSelected" key={number} onClick={()=>{paginate(number)}} >{number}</button>
         : <button className="buttons" key={number} onClick={()=>{paginate(number)}} >{number}</button>
        ))
        }
        {
            currentPage < pageNumbers.length
            ? <div>
                <button onClick={(e)=>{handlerNext(e)}}>Siguiente</button>
              </div>
            : null
        }
    </div>
  )
}