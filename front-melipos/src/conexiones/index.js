import Axios from "axios"
import { IP } from "./ip"

/** 
 * @param {*} usuario :objeto con dos parametros obligatorios id y password.
 * @description: comprueba el acceso de usuario y retorna true o false crea una cache de sesion. 
 */
export const inicio_sesion= async usuario =>{
    let respuesta = await Axios.post(`${IP}usuarios/api/login`,usuario).catch(err=>console.log("Error en login..."))
    return respuesta.data;
}
