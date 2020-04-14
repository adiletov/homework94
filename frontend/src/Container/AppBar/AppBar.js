import React, {Component} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import instLogo from "../../assets/images/instagram_logo.svg";
import Grid from "@material-ui/core/Grid";
import Search from "../../Component/Search/Search";
import {connect} from "react-redux";
import {getUsers, logoutUser} from "../../Store/Action/actionUsers";
import UserHeader from "../../Component/UserHeader/UserHeader";
import {NavLink} from "react-router-dom";


class AppBarBlock extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return (
            <>
                <AppBar position="static" color="transparent">
                    <Container maxWidth="md">
                        <Toolbar variant="dense">
                            <Grid container justify="space-around" alignItems="center">
                                <Grid item xs={4} component={NavLink} to="/">
                                    <img src={instLogo} alt="logotype" style={{width: '150px'}}/>
                                </Grid>
                                <Grid item xs>
                                    {this.props.users &&
                                    <Search
                                        users={this.props.users}
                                    />
                                    }
                                </Grid>
                                <Grid item xs={1}>
                                    <UserHeader
                                    user={this.props.user}
                                    logout={this.props.logoutUser}
                                    />
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    users: state.users.users
});
const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    logoutUser: ()=> dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(AppBarBlock);