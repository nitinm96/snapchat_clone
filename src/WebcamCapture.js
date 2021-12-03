import React,{useCallback, useRef, useState} from "react"
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import "./style/webcamCapture.css";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { selectUser } from "./features/appSlice";
import { Avatar } from "@mui/material";


const videoConstraints = {
    width: 250,
    height: 450,
    facingMode: "user",
};

function WebcamCapture(){
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);


    const capture = useCallback(()=> {
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCameraImage(imageSrc))
      history.push("/preview")
    }, [webcamRef])

    const chatView = () =>{
      history.replace("/chats")
    }

    return(
        <div className='webcamCapture'>

          <div className="capture__header">
                <Avatar src={user.profilePic}
                className="capture__avatar" 
                fontSize="small"
                /> 
          </div>



          <Webcam 
            audio={false}
            height={videoConstraints.height} ref ={webcamRef}
            screenshotFormat = "image/jpeg"
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
          />  
          <RadioButtonUncheckedIcon 
            className = 'webcamCapture__button'
            onClick={capture}
            fontSize = "large"
          />
          <div className = "capture__footer">
            <ChatBubbleIcon
              className = 'chat__ViewButton'
              onClick = {chatView}
              fontSize = "small"
            />

            <EmojiEmotionsOutlinedIcon 
            className = 'emote__button'
            fontSize = "small"
            />
          </div>
        </div>
    );
};

export default WebcamCapture