"use client";

import { AppDispatch } from "@/app/store/store";
import Modal from "../../ui/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setIsOpenLoginModal,
  setIsOpenRegisterModal,
} from "@/app/store/slices/appSlice";
import cl from "./style.module.css";
import { RegisterExecutorForm } from "../layouts/Header/components/RegisterExecutorForm";
import { RegisterClientForm } from "../layouts/Header/components/RegisterClientForm";
import { LoginExecutorForm } from "../layouts/Header/components/LoginExecutorForm";
import { LoginClientFrom } from "../layouts/Header/components/LoginClientFrom";

type Props = {};

export const LoginRegister = (props: Props) => {
  const { isOpenRegisterModal } = useSelector((state: any) => state.app);
  const { isVisibleLoginModal } = useSelector((state: any) => state.app);
  const [isExecutor, setIsExecutor] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
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
