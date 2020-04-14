import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PublicationPage from "../PublicationPage/PublicationPage";
import InfoPage from "../InfoPage/InfoPage";


const Page = () => {
    return (
            <Container maxWidth="md">
                <Grid container direction="row" spacing={1}>
                    <Grid item xs>
                        <PublicationPage/>
                    </Grid>
                    <Grid item xs={3}>
                        <InfoPage/>
                    </Grid>
                </Grid>
            </Container>
    );
};

export default Page;