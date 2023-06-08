import './App.css';
import {BrowserRouter, Route, Switch}from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from "./components/Home/Home.jsx";
import Detail from './components/Detail/Detail';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/recipe/detail/:id" component={Detail}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
