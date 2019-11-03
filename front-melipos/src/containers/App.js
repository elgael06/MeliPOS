//libreria
import { connect } from 'react-redux';

import App from '../components/App';
import { REMOVE_USER } from '../actions';

const mapStateProps=()=>({

});

const mapDispatchToProps = dispatch =>({
    evRemoveUser(){
        dispatch(REMOVE_USER());
    }
});

export default connect(mapStateProps,mapDispatchToProps)(App);