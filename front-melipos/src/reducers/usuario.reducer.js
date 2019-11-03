
const Usuario = (
    state={
        id_usuario:0,
        usuario:'',
        nombre:''
    },
    actions={
        type=''
    } 
)=>{
    switch(actions.type){
        case 'add_user':
            localStorage.setItem('User',JSON.stringify(actions.Usuario));
            return actions.Usuario;
        case 'remove_user':
            localStorage.removeItem('User');
            return {
                id_usuario:0,
                usuario:'',
                nombre:''
            }
        case 'get_user':
            return JSON.parse(localStorage.User) || null;
        default:
            return state;
    }
}