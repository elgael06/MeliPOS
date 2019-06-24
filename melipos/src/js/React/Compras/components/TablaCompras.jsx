import React, { useState } from "react"; //Importamos react

const TablaCompras=({lista,total})=>{

const [productos,setProductos] = useState({});

const evProductos=seleccion =>{
    setProductos(seleccion)
    console.log(seleccion)
}

 return (
     <div class="card-body">
         <label>Total : {total || 0}</label>
         <hr/>
        <div class="row p-4" style={{maxHeight:"450px", border:"solid 1px #dcccc8",overflow:"auto"}}>
            {lista.length>0 
        ?lista.map(e=>  
            (<div class="col-sm-12 card mt-2">
                <div class="card-body">
                    <div class="row">
                        <h5 class="col-sm-1">ID : {e.id}</h5>
                        <label class="col-sm-6">Proveedor : {e.proveedor}</label>
                        <p  class="col-sm-2">Fecha : {e.fecha}</p>
                        <span class="col-sm-3" >
                            <i class="btn btn-info fa fa-list btn-sm btn-block" 
                                style={{float:"right"}} 
                                onClick={()=>evProductos(e.Productos_lista)} >Productos</i>
                        </span>
                        <label class="col-sm-8"> Descripcion: {e.Descripcion || "Sin Descripcion"}</label>
                        <label  class="col-sm-2">Total : {e.Total}</label>
                        <label class="col-sm-2">{ e.estatus=="V"?"Vigente":"Finalizado"}</label>
                    </div>
                    
                </div>
            </div>) )
         :<label>Sin Datos</label>}
        </div>
     </div>
 );   
}

export default TablaCompras;