
const Usuario = (
    state={
        id_usuario:0,
        usuario:'',
        nombre:''
    },actions
)=>{
    switch(actions.type){
        case 'add_user':
            localStorage.setItem('User',JSON.stringify(actions.Usuario));
            return actions.Usuario;
        case 'remove_user':
            localStorage.removeItem('User');
            return null
        case 'get_user':
            return JSON.parse(localStorage.User || null );
        default:
            return state;
    }
}

export default Usuario;