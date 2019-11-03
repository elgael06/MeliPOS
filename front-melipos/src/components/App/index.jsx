//librerias
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//estilos
import './styles.css'

const App=({evRemoveUser})=> {
  const salir = e =>{
    e.preventDefault();
    evRemoveUser();
  }
  return (<div className="App">
      <label >page main <b>App.</b></label>
      <button onClick={salir}>salir</button>
      <Router>
            <Switch>
                <Route exact={true} path="/" component={()=><h1>Home</h1>} />
                <Route exact={true} path="/login" component={()=><Redirect to="/" />} />
            </Switch>
        </Router>
    </div>);
}

export default App;
