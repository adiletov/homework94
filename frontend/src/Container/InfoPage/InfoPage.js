import React from 'react';
import Grid from "@material-ui/core/Grid";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {subscribeUser} from "../../Store/Action/actionUsers";
import AvatarBlock from "../../Component/AvatarBlock/AvatarBlock";

const InfoPage = (props) => {
    let user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    if (props.user) {
        user = props.user;
    }

    const subscribe = (id) => {
        dispatch(subscribeUser(id))
    };
    return (
        <div>
            <Grid container direction="column">
                <Grid item xs style={{padding: '0'}}>
                    {
                        user &&
                        <ListItem>
                            <ListItemAvatar>
                                <AvatarBlock
                                    user={user}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={user.fullName} secondary={user.username}/>
                        </ListItem>
                    }
                </Grid>
                <Grid item xs>
                    {props.user &&
                    <Button variant="outlined" color="primary" onClick={() => subscribe(props.user._id)}>Подписатся</Button>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default InfoPage;