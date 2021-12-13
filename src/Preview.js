import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import AudiotrackRoundedIcon from "@mui/icons-material/AudiotrackRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./style/Preview.css";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      //Error if anything happens.
      (error) => {
        console.log(error);
      },
      //On Complete function.
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseRoundedIcon
        onClick={closePreview}
        className="close__icon"
        fontSize="medium"
      />

      <div className="icon__toolbarRight">
        <TextFieldsRoundedIcon className="text__icon" />
        <CreateRoundedIcon className="create__icon" />
        <TimerOutlinedIcon className="timer__icon" />
        <CropOutlinedIcon className="crop__icon" />
        <AudiotrackRoundedIcon className="music__icon" />
      </div>

      <div onClick={sendPost} className="preview__footer">
        <h3>Send</h3>
        <SendRoundedIcon fontSize="small" className="send__icon" />
      </div>
      <img src={cameraImage} alt="noImg" />
    </div>
  );
}
export default Preview;
