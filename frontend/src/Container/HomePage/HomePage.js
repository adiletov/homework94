import React from 'react';
import AppBarBlock from "../AppBar/AppBar";

import {Route, Switch} from "react-router-dom";
import Page from "../Page/Page";
import NewPublication from "../NewPublication/NewPublication";
import Toolbar from "@material-ui/core/Toolbar";
import Edit from "../Edit/Edit";
import PageId from "../PageId/PageId";

const HomePage = () => {
    return (
        <div>
            <AppBarBlock/>
            <Toolbar/>
            <Switch>
                <Route exact path="/" component={Page}/>
                <Route exact path="/add" component={NewPublication}/>
                <Route exact path="/edit" component={Edit}/>
                <Route exact path="/user/:id" component={PageId}/>
            </Switch>
        </div>
    );
};

export default HomePage;