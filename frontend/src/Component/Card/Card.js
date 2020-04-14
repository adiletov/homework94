import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {apiURL} from "../../apiURL";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AvatarBlock from "../AvatarBlock/AvatarBlock";

const useStyles = makeStyles({
    root: {
        maxWidth: "85%",
    },
    media: {
        height: 340,
    },
});
const CardPublication = (props) => {
    const classes = useStyles();
    return (
        <>
            <Grid item xs>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardHeader
                            avatar={
                                <AvatarBlock
                                user={props.publications.userId}
                                />
                            }
                            title={props.publications.userId.fullName}
                            subheader={props.publications.userId.username}
                        />
                        {
                            props.publications.image &&
                            <CardMedia
                                className={classes.media}
                                image={apiURL + '/uploads/' + props.publications.image}
                                title="Contemplative Reptile"
                            />
                        }

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.publications.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.publications.description}
                            </Typography>
                            <Divider/>
                            <Grid container>
                                {props.publications.tags.map(tag=>
                                    <Grid item  key={tag}>
                                        <Typography variant="caption" color="primary" component="p">
                                            #{tag}
                                        </Typography>
                                    </Grid>

                                )}
                            </Grid>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton>
                            <FavoriteOutlinedIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
};

export default CardPublication;