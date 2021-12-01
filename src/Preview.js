import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import "./style/Preview.css";


function Preview(){
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect (() => {
        if (!cameraImage){
            history.replace("/")
        }
    }, [cameraImage, history])

    const closePreview = () =>{
        dispatch(resetCameraImage());
        history.replace('/');
    }

    return(
        <div className = "preview">
            <CloseRoundedIcon onClick = {closePreview} className = "close__icon" fontSize = "medium"/>

            <div className = "icon__toolbarRight">
                <TextFieldsRoundedIcon className = "text__icon" />
                <CreateRoundedIcon     className = "create__icon" />
                <TimerOutlinedIcon     className = "timer__icon" />                       
                <CropOutlinedIcon      className = "crop__icon"  />           
                <AudiotrackRoundedIcon className = "music__icon" />           
            </div>


            <img src = {cameraImage} alt = "noImg"/>

            <div className = "preview__footer">
             <h3>Send</h3>   
             <SendRoundedIcon className = "send__icon" />

            </div>
        </div>
    )
    
}
export default Preview