"use client";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../ui/modal/Modal";
import cl from "./style.module.css";
import Image from "next/image";
import { AppDispatch } from "@/app/store/store";
import { setIsOpenModal } from "@/app/store/slices/appSlice";
import src from "./assets/warning 1.png";

export const ErrorModal = () => {
  const { isOpenModal, errorText, errorMethod, errorCode } = useSelector(
    (state: any) => state.app
  );
  const dispatch = useDispatch<AppDispatch>();
  const changeModal = () => {
    dispatch(setIsOpenModal(!isOpenModal));
  };
  return (
    <Modal visible={isOpenModal} setVisible={changeModal}>
      <div className={cl.errorContainer}>
        <p className={cl.errorTitle}>Возникла ошибка!</p>
        <p className={cl.errorCode}>{errorCode}</p>
        <Image src={src} alt="warning" />
        <p className={cl.method}>Метод: {errorMethod}</p>
        <p className={cl.text}>Текст: {errorText}</p>
      </div>
    </Modal>
  );
};
