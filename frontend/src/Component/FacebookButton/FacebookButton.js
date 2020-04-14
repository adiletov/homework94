import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {loginFacebook} from "../../Store/Action/actionUsers";


const FacebookButton = () => {
    const dispatch = useDispatch();
    const facebookResponse = (response) => {
        dispatch(loginFacebook(response));
    };
    return (
        <FacebookLogin
            appId="1342251599302385"
            callback={facebookResponse}
            fields="name,email,picture"
            render={renderProps => (
                <Button
                    fullWidth
                    color="primary"
                    onClick={renderProps.onClick}
                    startIcon={<FacebookIcon/>}
                >
                    Войти через Facebook
                </Button>
            )}
        />
    );
};

export default FacebookButton;