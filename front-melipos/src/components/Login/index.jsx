//librerias
import React,{useState} from 'react';
import { inicio_sesion } from '../../conexiones';

const Login =({actions})=>{
    const [id,setId] = useState('');
    const [password,setPasswd] = useState('');
    const click = async event=>{

        event.preventDefault();
        try{
            let user = await inicio_sesion({id,password});
            actions(user)
        }catch(err){
            console.log(err);
        }
    }

    console.log('Login...')
    return (<div className="login-container">
        <label >this is the <b>login</b></label>
        <hr/>
        <form onSubmit={click}>
        <div>
            <input type="text" value={id} onChange={e=>setId(e.target.value)} placeholder="ID" />
        </div>
        <div>
            <input type="password" value={password} onChange={e=>setPasswd(e.target.value)} placeholder="password" />
        </div>
        <button type="submit" onClick={click}>Login</button>
        </form>
    </div>);
}

export default Login;