"use client";
import cl from "../style.module.css";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import {
  setIsOpenLoginModal,
  setIsOpenMobMenu,
} from "@/app/store/slices/appSlice";
export const LoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        className={cl.registerBtn}
        onClick={() => {
          dispatch(setIsOpenLoginModal(true));
          dispatch(setIsOpenMobMenu(false));
        }}
      >
        Войти
      </button>
    </>
  );
};
