import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {apiURL} from "../../apiURL";

const AvatarBlock = ({user}) => {
    if (user.avatar){
        if (user.facebookId) {
            if (!user.avatar_change) {
                return <Avatar src={user.avatar} alt="avatar"/>
            } else {
                return <Avatar src={apiURL + '/uploads/' + user.avatar} alt="avatar"/>
            }
        } else {
            return <Avatar src={apiURL + '/uploads/' + user.avatar} alt="avatar"/>
        }
    }else{
        return <Avatar/>
    }

};

export default AvatarBlock;