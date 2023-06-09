import './App.css';
import {BrowserRouter, Route, Switch}from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from "./components/Home/Home.jsx";
import Detail from './components/Detail/Detail';
import FormCreateRecipe from './components/FormCreateRecipe/FormCreateRecipe';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/recipe/detail/:id" component={Detail}/>
      <Route exact path="/createRecipe" component={FormCreateRecipe}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
