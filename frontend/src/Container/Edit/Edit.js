import React, {Component} from 'react';
import {connect} from "react-redux";
import FormElement from "../../Component/FormElement/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import instLogo from "../../assets/images/instagram_logo.svg";
import {updateProfile} from "../../Store/Action/actionUsers";
import AvatarBlock from "../../Component/AvatarBlock/AvatarBlock";



class Register extends Component {
    state = {
        fullName: this.props.user.fullName || '',
        username: this.props.user.username || '',
        avatar: null
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    fileChangeHandler = event => {
        this.setState({[event.target.name] : event.target.files[0]})
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).map(key =>
            formData.append(key, this.state[key])
        );
        this.props.updateProfile(formData)
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={3}
                          style={{border: '1px solid black', padding: '30px', textAlign: 'center'}}
                    >
                        <Grid item xs>
                            <img style={{width: '150px', margin: '20px 0px 30px 0px'}} src={instLogo} alt="logotype"/>
                        </Grid>
                        <form onSubmit={this.submitFormHandler}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        type="text"
                                        propertyName="fullName"
                                        title="fullName"
                                        value={this.state.fullName}
                                        onChange={this.inputChangeHandler}
                                        error={this.getFieldError('fullName')}
                                        autoComplete="new-fullName"
                                    />
                                </Grid>
                                {this.props.user && this.props.user.facebookId && !this.props.user.username_changed &&
                                <Grid item xs>
                                    <FormElement
                                        type="text"
                                        propertyName="username"
                                        title="Username"
                                        value={this.state.username}
                                        onChange={this.inputChangeHandler}
                                        error={this.getFieldError('username')}
                                        autoComplete="new-username"
                                    />
                                </Grid>
                                }
                                {
                                    !this.state.avatar &&
                                        <Grid item xs>
                                            {this.props.user && this.props.user.avatar &&
                                            <AvatarBlock user={this.props.user}/>
                                            }
                                        </Grid>
                                }



                                <Grid item xs>
                                    <FormElement
                                        type="file"
                                        propertyName="avatar"
                                        title="Avatar"
                                        onChange={this.fileChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" color="primary" variant="contained">
                                        Update
                                    </Button>
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
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (userData)=> dispatch(updateProfile(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);