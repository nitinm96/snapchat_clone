import React,{useCallback, useRef, useState} from "react"
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import "./webcamCapture.css";

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture(){
    const webcamRef = useRef(null)
    const [image, setImage] = useState(null)
    const capture = useCallback(()=> {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc)
      setImage(imageSrc)
    }, [webcamRef])

    return(
        <div className='webcamCapture'>
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
          />
          <img src ={image} alt = ""/>
        
        </div>
    );
};

export default WebcamCapture