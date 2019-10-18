//librerias
import React from 'react';
//estilos
import './styles.css'

/**
 * 
 * @param children:componente que se optiene en el props a renderizar.
 * @description :este componente contiene el template del sistema.
 * @requires :componente a renderizar.
 */
const App=({children})=> {
  return (<div className="App">
      <label >page main <b>App.</b></label>
    </div>);
}

export default App;
