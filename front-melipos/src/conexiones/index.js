import Axios from "axios"
import { IP } from "./ip"

/** 
 * @param {*} usuario :objeto con dos parametros obligatorios id y password.
 * @description: comprueba el acceso de usuario y retorna true o false crea una cache de sesion. 
 */
export const inicio_sesion= async usuario =>{
    console.log(usuario)
    //let respuesta = await Axios.post(`${IP}/usuarios/api/login`,usuario);
    //return respuesta.data;
    return {
        ...usuario,
        nombre:''
    }
}
