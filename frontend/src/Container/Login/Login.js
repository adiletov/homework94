import React, {Component} from 'react';
import FormElement from "../../Component/FormElement/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import instLogo from "../../assets/images/instagram_logo.svg";
import {connect} from "react-redux";
import {loginUser} from "../../Store/Action/actionUsers";
import Alert from "@material-ui/lab/Alert";
import FacebookButton from "../../Component/FacebookButton/FacebookButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitChangeHandler = e => {
        e.preventDefault();
        this.props.loginUser({...this.state});
    };



    render() {
        return (
            <>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={10} md={6} lg={3}
                          style={{border: '1px solid black', padding: '30px', textAlign: 'center'}}>
                        <Grid item xs>
                            <img style={{width: '150px', margin: '20px 0px 30px 0px'}} src={instLogo} alt="logotype"/>
                        </Grid>
                        <form onSubmit={this.submitChangeHandler}>
                            {this.props.error &&
                            <Grid item xs>
                                <Alert severity="error">{this.props.error.error}</Alert>
                            </Grid>
                            }
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        type="text"
                                        propertyName="username"
                                        title="Имя пользователя"
                                        value={this.state.username}
                                        onChange={this.inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="password"
                                        propertyName="password"
                                        title="Пароль"
                                        value={this.state.password}
                                        onChange={this.inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" fullWidth variant="contained" color="primary">Войти</Button>
                                </Grid>
                                <Grid item xs>
                                    или
                                </Grid>
                                <Grid item xs>
                                    <FacebookButton/>
                                </Grid>
                                <Grid item xs>
                                    <Divider/>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="caption" display="block" gutterBottom>У вас ещё нет аккаунта?
                                        <NavLink style={{textDecoration: 'none', fontWeight: 'bold'}} to="/register"> Зарегистрироваться</NavLink></Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});
const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);