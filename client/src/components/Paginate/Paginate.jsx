import { useEffect } from "react"

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
    console.log("Rendering Paginate");
    console.log("PAGE NUMBERS: ",pageNumbers);
    console.log("recipesNumber: ",recipesNumber);
    console.log("recipesPerPage: ",recipesPerPage);
},[currentPage])
  return (
    <div>
      <div>
        {
            currentPage > 1 
            ? <div>
                <button onClick={(e)=>{handlerPrevious(e)}}>Previous</button>
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
                <button onClick={(e)=>{handlerNext(e)}}>Next</button>
              </div>
            : null
        }
      </div>
    </div>
  )
}