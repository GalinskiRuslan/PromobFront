"use client";
import Modal from "@/app/components/ui/modal/Modal";
import cl from "../style.module.css";
import { AppDispatch } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpenLoginModal,
  setIsOpenMobMenu,
  setIsOpenRegisterModal,
} from "@/app/store/slices/appSlice";
import { useState } from "react";
import { LoginExecutorForm } from "./LoginExecutorForm";
import { LoginClientFrom } from "./LoginClientFrom";
export const LoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isVisibleLoginModal } = useSelector((state: any) => state.app);
  const [isExecutor, setIsExecutor] = useState(true);
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
      <Modal
        setVisible={() => {
          dispatch(setIsOpenLoginModal(false));
        }}
        visible={isVisibleLoginModal}
      >
        <>
          <p className={cl.title}>Вход</p>
          <div className={cl.btnsContainer}>
            <button
              onClick={() => setIsExecutor(false)}
              className={!isExecutor ? cl.activeBtn : cl.inactiveBtn}
            >
              Заказчик
            </button>
            <button
              onClick={() => setIsExecutor(true)}
              className={isExecutor ? cl.activeBtn : cl.inactiveBtn}
            >
              Исполнитель
            </button>
          </div>
          {isExecutor ? <LoginExecutorForm /> : <LoginClientFrom />}
          <button
            className={cl.loginBtn}
            onClick={() => {
              dispatch(setIsOpenLoginModal(false));
              dispatch(setIsOpenRegisterModal(true));
            }}
          >
            Регистрация
          </button>
        </>
      </Modal>
    </>
  );
};
