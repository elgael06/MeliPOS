//libreria
import { connect } from 'react-redux';

import Login from '../components/Login';

const mapStateProps=()=>({

});

const mapDispatchToProps = dispatch =>({
    actions(user){
        dispatch(ADD_USER(user));
    }
});

export default connect(mapStateProps,mapDispatchToProps)(Login);
