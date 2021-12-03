import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./style/Chats.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { db, auth } from './firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';




function Chats() {

        const [posts, setPosts] = useState([]);
        const user = useSelector(selectUser);
        const history = useHistory();
        const dispatch = useDispatch();

        useEffect(() =>{
            db.collection('posts')
            .orderBy('timeStamp', 'desc')
            .onSnapshot(snapshot => 
                setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
            }))
            )
        );
    }, []);

    const takeSnap = () =>{
        dispatch(resetCameraImage());
        history.push("/");
    };

    return (
        <div className = "chats">
            <div className="chats__header">
                <Avatar src={user.profilePic}
                onClick ={() => auth.signOut()} 
                className="chats__avatar" 
                /> 

                <div className = "chats__search">
                    <SearchRoundedIcon className="search__icon" />
                    <input placeholder = "Friends" type= "text" />
                    <CameraAltOutlinedIcon 
                    className = "camera__icon"
                    onClick = {takeSnap}
                    fontSize="medium"
                    />
                </div>
            </div>

            <div className ="chats__posts">
                {posts.map(
                    ({
                        id, 
                        data: { profilePic, username, timeStamp, imageUrl, read }, 
                    }) => (
                    <Chat
                    key = {id}
                    id = {id}
                    username = {username}
                    timeStamp = {timeStamp}
                    imageUrl = {imageUrl}
                    read = {read}
                    profilePic = {profilePic}
                    />
                )
                )}
            </div>
        </div>
        
    );
}

export default Chats;