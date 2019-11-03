//librerias
import React,{useState} from 'react';
import { inicio_sesion } from '../../conexiones';

const Login =({actions})=>{
    const [id,setId] = useState('1');
    const [password,setPasswd] = useState('1111');
    const click = async ()=>{
        let user = await inicio_sesion({id,password}).catch(err=>actions(null));
        actions(user)
    }
    return (<div className="login-container">
        <label >this is the <b>login</b></label>
        <button onClick={click}>Login</button>
    </div>);
}

export default Login;