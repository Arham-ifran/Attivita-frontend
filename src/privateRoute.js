import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { ENV } from './config/config';

export const PrivateRoute = ({ component: Component, access, ...rest }) => {
    const history = useHistory();
    let userData = ENV.getUserKeys();
    if(!userData.customername){
        history.push('/login')
        return ''
    }else{
        return (
            <Route
                {...rest}
                render={props =>
                    access === true ?
                        (<Component {...props} />)
                        :
                        ''
            } />
    
        )
    }
}