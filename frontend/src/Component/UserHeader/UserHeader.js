import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {NavLink} from "react-router-dom";
import AvatarBlock from "../AvatarBlock/AvatarBlock";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const UserHeader = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                color="primary"
                onClick={handleClick}
            >
                <ListItem>
                    <ListItemAvatar>
                        <AvatarBlock
                        user={props.user}
                        />
                    </ListItemAvatar>
                </ListItem>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem component={NavLink} to="/add" >
                    <ListItemIcon>
                        <AddBoxOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Добавить публикацию"/>
                </StyledMenuItem>
                <StyledMenuItem component={NavLink} to="/edit">
                    <ListItemIcon>
                        <AccountBoxIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Профиль"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={props.logout}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Выйти"/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
};

export default UserHeader;