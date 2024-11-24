"use client";
import Modal from "@/app/components/ui/modal/Modal";
import cl from "../style.module.css";
import { useState } from "react";
import { RegisterExecutorForm } from "./RegisterExecutorForm";
import { RegisterClientForm } from "./RegisterClientForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  setIsOpenLoginModal,
  setIsOpenMobMenu,
  setIsOpenRegisterModal,
} from "@/app/store/slices/appSlice";

export const RegisterButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenRegisterModal } = useSelector((state: any) => state.app);
  const [isExecutor, setIsExecutor] = useState(true);
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
      <Modal
        visible={isOpenRegisterModal}
        setVisible={() => dispatch(setIsOpenRegisterModal(false))}
      >
        <p className={cl.title} style={{ margin: "10px 0" }}>
          Регистрация
        </p>
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
        {isExecutor ? <RegisterExecutorForm /> : <RegisterClientForm />}
        <button
          className={cl.loginBtn}
          onClick={() => {
            dispatch(setIsOpenLoginModal(true));
            dispatch(setIsOpenRegisterModal(false));
          }}
        >
          Уже есть аккаунт? Войти
        </button>
      </Modal>
    </>
  );
};
