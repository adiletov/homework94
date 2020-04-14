import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import {useSelector} from "react-redux";
import AvatarBlock from "../AvatarBlock/AvatarBlock";


const Search = (props) => {
    const user = useSelector(state=> state.users.user);
    return (
        <>
            <Autocomplete
                id={props.propertyName}
                options={props.users}
                getOptionLabel={(option) => option.username}
                renderOption={(option) => {
                    if (option._id !== user._id) {
                       return  <ListItem component={NavLink} to={`/user/${option._id}`}>
                            <AvatarBlock user={option}/>
                            {option.username}
                        </ListItem>
                }}}
                style={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params} label="Поиск" variant="outlined"  size="small"/>}
            />
        </>
    );
};

export default Search;