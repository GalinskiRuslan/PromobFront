"use client";
import cl from "../style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  setIsOpenMobMenu,
  setIsOpenRegisterModal,
} from "@/app/store/slices/appSlice";

export const RegisterButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        className={cl.registerBtn}
        onClick={() => {
          dispatch(setIsOpenRegisterModal(true));
          dispatch(setIsOpenMobMenu(false));
        }}
      >
        Регистрация
      </button>
    </>
  );
};
