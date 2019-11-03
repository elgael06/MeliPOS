//libreria
import { connect } from 'react-redux';

import Login from '../components/Login/index';
import { ADD_USER } from '../actions';

const mapStateProps=()=>({

});

const mapDispatchToProps = dispatch =>({
    actions(user){
        dispatch(ADD_USER(user));
    }
});

export default connect(mapStateProps,mapDispatchToProps)(Login);
