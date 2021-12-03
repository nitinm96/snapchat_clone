import { Avatar } from '@mui/material';
import React from 'react';
import "./style/Chat.css"
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import ReactTimeago from "react-timeago";
import { selectImage, selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from './firebase';
import { useHistory } from 'react-router';



function Chat({ id, username ,profilePic, timeStamp, imageUrl, read }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const open = () => {
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set(
            {
                read: true
            },
            {merge: true }
        );
            history.push('/chats/view');
        }
    };

    return (
        <div onClick = {open} className = "chat">
            <Avatar className = "chat__avatar" src = {profilePic} />
            <div className = "chat__info">
                <h4>{username}</h4>
                <p>{!read && ' Tap to view - '} {read && "Opened "}
                <ReactTimeago date = {new Date(timeStamp?.toDate()).toUTCString()}/></p>
            
            </div>
        {!read && <SquareRoundedIcon className = "sq__icon"/> }  
        </div>

    );
}

export default Chat;