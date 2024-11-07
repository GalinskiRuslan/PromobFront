"use client";
import { useEffect, useState } from "react";
import cl from "./style.module.css";
import Image from "next/image";
import src from "./assets/Camera.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { uploadProfilePhoto } from "@/app/store/slices/userSlice";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";

const ProfilePictureUploader = () => {
  const [image, setImage] = useState<any>(null);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user?.photos) {
      setImage(user.photos);
    }
  }, [user]);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(setVisibleLoader(true));
      try {
        const reader = new FileReader();
        const response = await dispatch(uploadProfilePhoto(file)).unwrap();
        reader.onloadend = () => {
          setImage(reader.result); // Устанавливаем изображение в состояние
        };
        reader.readAsDataURL(file);
        dispatch(setVisibleLoader(false));
      } catch (e: any) {
        dispatch(setVisibleLoader(false));
        dispatch(setIsOpenModal(true));
        dispatch(setErrorText(e.errorText));
        dispatch(serErrorMethod(e.method));
        dispatch(setErrorCode(e.status));
      }
    }
  };

  return (
    <div className={cl.profile_picture}>
      <img
        src={image || "/Group 2.png"} // Показывает загруженное изображение или изображение-заполнитель
        alt="Profile"
        className={cl.profile_img}
      />
      <label htmlFor="upload-photo" className={cl.upload_icon}>
        <i className={cl.camera_icon}>
          <Image src={src} alt="camera" />
        </i>
      </label>
      <input
        type="file"
        id="upload-photo"
        className={cl.file_input}
        accept="image/*"
        onChange={handleImageChange} // Обработчик для обновления изображения
      />
    </div>
  );
};

export default ProfilePictureUploader;
