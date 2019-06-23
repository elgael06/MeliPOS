import React, { useState } from "react"; //Importamos react


const Cavecera = ({consulta}) => {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    const [inicio,setInicio] = useState("2019-01-01");
    const [fin,setFin] = useState("2019-01-02");

    return (
      <div class="card-header">
          <label style={{color:"#000",fontSize:"22px"}}>Monitor Compras</label>
          <div class="row">
            <div class="col-sm-4 form-inline form-sm">
                <label>De :</label>
                <input 
                    type="date" 
                    class="form-control form-sm" 
                    value={inicio} 
                    onChange={(f)=>setInicio(f.target.value)} 
                />
            </div>
            <div class="col-sm-4 form-inline form-sm">
                <label>A :</label>
                <input 
                    type="date" 
                    class="form-control  form-sm" 
                    value={fin} 
                    onChange={(f)=>setFin(f.target.value)} 
                />
            </div>
            <div class="col-sm-4">
                <i 
                    class="btn btn-success btn-block btn-sm" 
                    onClick={()=>consulta(inicio,fin)}> 
                    Consultar <i class="fa fa-angle-double-right p-1"></i>
                </i>
            </div>
          </div>
      </div>
    );
  }
  export default Cavecera;