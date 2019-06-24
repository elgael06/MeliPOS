import React, { useState } from "react"; //Importamos react

import Cavecera from './Cavecera';
import TablaCompras from './TablaCompras';

const App = () =>{

    const [datos,setDatos]  = useState([]);
    const [total ,setTotal] = useState(0);

    const consulta=(inicio,fin)=>{
        console.log("inicio : "+inicio + ", Fin : "+fin);
        console.log("Datos => ",datos);
        (inicio=="" || fin=="") || pedirFecha(inicio,fin);
    }

    const pedirFecha=(inicio,fin)=>{
        document.querySelector("#modal_load").style.display = "flex";
      fetch(`monitor/api?inicio=${inicio}&fin=${fin}`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(e => {
          document.querySelector("#modal_load").style.display = "none";
          alert("Error De Conexion !!");
        })
        .then(e => {
          e.json()
            .then(res => {
                console.log(res)

                res.ordenes.length==0 || setDatos(res.ordenes)
                setTotal(res.Total)

                document.querySelector("#modal_load").style.display = "none"; 
            })
            .catch(e => {
              document.querySelector("#modal_load").style.display = "none";
              alert("Error En Formato JSON !!!");
            });
        });

    }

    return(
        <div class="card">
            <Cavecera 
                consulta={consulta}
            />
            <TablaCompras lista={datos} total={total} />
        </div>
    );
}

export default App;