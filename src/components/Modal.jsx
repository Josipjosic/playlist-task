import React from "react";
import styleModal from "./Modal.module.scss";
import {AiFillPlayCircle} from 'react-icons/ai'

const Modal = ({ selectedItem, open, onClose }) => {
  if (!open) return null;

  var duration = selectedItem.duration

  var minutes = Math.floor(duration / 60);
  var seconds = duration - minutes * 60;

  
  
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = `${minutes}:${seconds}`

  return (
    <div onClick={onClose} className={styleModal.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styleModal.container}
      >
        <img
          src={selectedItem.album.cover_big}
          alt={selectedItem.album.cover_medium}
        ></img>
        <h3>{selectedItem.position}</h3>
        <h3>{selectedItem.title}</h3>
        <h4>{selectedItem.artist.name}</h4>
        <p>{time}</p>
        <a href={selectedItem.link}><AiFillPlayCircle /></a>
        <button onClick={onClose} className={styleModal.button}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
