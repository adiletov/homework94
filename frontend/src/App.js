import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import Login from "./Container/Login/Login";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./Container/Register/Register";
import HomePage from "./Container/HomePage/HomePage";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div>
            <CssBaseline/>
            <Switch>
                <Route exact path="/" render={() => (
                    user ?
                       (<Route exact path="/" component={HomePage}/>)
                        :
                       ( <Redirect to="/login"/>)
                )}/>
                {!user ?
                <>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                </> : <HomePage/>
                }
            </Switch>
        </div>
    );
}

export default App;
