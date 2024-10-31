"use client";
import Modal from "@/app/components/ui/modal/Modal";
import cl from "../style.module.css";
import { useState } from "react";
import { RegisterExecutorForm } from "./RegisterExecutorForm";
import { RegisterClientForm } from "./RegisterClientForm";

interface IRegisterButtonProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setVisibleLogin: (value: boolean) => void;
}
export const RegisterButton = (props: IRegisterButtonProps) => {
  const [isExecutor, setIsExecutor] = useState(true);
  return (
    <>
      <button className={cl.registerBtn} onClick={() => props.setVisible(true)}>
        Регистрация
      </button>
      <Modal visible={props.visible} setVisible={props.setVisible}>
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
            props.setVisibleLogin(true);
            props.setVisible(false);
          }}
        >
          Уже есть аккаунт? Войти
        </button>
      </Modal>
    </>
  );
};
