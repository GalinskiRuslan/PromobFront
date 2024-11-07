import React, { useState, useRef } from "react";
import "./MultiImageUploader.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { uploadProfilePhoto } from "@/app/store/slices/userSlice";

const MultiImageUploader = () => {
  const [images, setImages] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null); // Ссылка на input

  const handleFilesChange = (event: any) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files: any) => {
    try {
      dispatch(setVisibleLoader(true));

      // Используем Promise.all для ожидания всех асинхронных операций
      const newImages = await Promise.all(
        files.map(async (file: any) => {
          // Загружаем изображение и добавляем объект с файлом и url
          await dispatch(uploadProfilePhoto(file)).unwrap();
          return {
            file,
            url: URL.createObjectURL(file),
          };
        })
      );

      setImages((prevImages: any) => [...prevImages, ...newImages]);
    } catch (e: any) {
      // Обработка ошибок
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(e.errorText));
      dispatch(serErrorMethod(e.method));
      dispatch(setErrorCode(e.status));
    } finally {
      // Выключаем лоадер после загрузки или ошибки
      dispatch(setVisibleLoader(false));
    }
  };

  const handleRemoveImage = (url: any) => {
    setImages((prevImages: any) =>
      prevImages.filter((img: any) => img.url !== url)
    );
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Программно вызываем клик на input
    }
  };

  return (
    <div className="multi-image-uploader">
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleZoneClick} // Обработчик клика на зону
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          ref={fileInputRef} // Устанавливаем ссылку на input
          className="file-input"
        />
        <p>Перетащите файлы сюда или нажмите, чтобы загрузить.</p>
      </div>
      <div className="preview-container">
        {images.map((image: any) => (
          <div key={image.url} className="image-preview">
            <img src={image.url} alt="Preview" className="preview-img" />
            <button
              className="remove-btn"
              onClick={() => handleRemoveImage(image.url)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUploader;
