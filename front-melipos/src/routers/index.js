import React from 'react';
//libreria
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import App from '../containers/App';
import Login from '../containers/Login';
//import App from '../components/App';


const RouterApp=({user})=>{
    console.log('user => ',user)

    return user ? <App/>:<Router>
        <Redirect to="/login"/>
        <Switch>
            <Route path="/login" component={Login} />
         </Switch>
    </Router>;
} 
const mapStateProps= state =>({
    user:state.Usuario
});
const mapDispatchToProps = dispatch =>({

});

export default connect(mapStateProps,mapDispatchToProps)(RouterApp);
