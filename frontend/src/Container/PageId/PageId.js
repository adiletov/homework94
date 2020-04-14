import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PublicationPage from "../PublicationPage/PublicationPage";
import InfoPage from "../InfoPage/InfoPage";
import {useDispatch, useSelector} from "react-redux";
import {getPublicationsId} from "../../Store/Action/actionPublications";
import {getUserId} from "../../Store/Action/actionUsers";

const PageId =  (props) => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getPublicationsId(props.match.params.id));
        dispatch(getUserId(props.match.params.id))
    }, [dispatch, props.match.params.id]);
    const user = useSelector(state=> state.users.userId);
    return (
        <Container maxWidth="md">
            <Grid container direction="row" spacing={1}>
                <Grid item xs>
                    <PublicationPage user={user}/>
                </Grid>
                <Grid item xs={3}>
                    <InfoPage user={user}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PageId;