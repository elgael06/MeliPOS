import React, { useState } from "react"; //Importamos react

import Cavecera from './Cavecera';

const App = () =>{
    const [datos,setDatos] = useState([]);

    const consulta=(inicio,fin)=>{
        console.log("inicio : "+inicio + ", Fin : "+fin);
        console.log("Datos => ",datos);
        let r = ["listo"];
        setDatos(r)
    }

    return(
        <div class="card">
            <Cavecera 
                consulta={consulta}
            />
        </div>
    );
}

export default App;