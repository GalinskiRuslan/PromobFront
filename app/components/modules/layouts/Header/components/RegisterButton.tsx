"use client";
import Modal from "@/app/components/ui/modal/Modal";
import cl from "../style.module.css";
import { useState } from "react";
import { RegisterExecutorForm } from "./RegisterExecutorForm";
import { RegisterClientForm } from "./RegisterClientForm";
export const RegisterButton = () => {
  const [modal, setModal] = useState(false);
  const [isExecutor, setIsExecutor] = useState(true);
  return (
    <>
      <button className={cl.registerBtn} onClick={() => setModal(true)}>
        Регистрация
      </button>
      <Modal visible={modal} setVisible={setModal}>
        <p className={cl.title} style={{ margin: "30px 0" }}>
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
        <button>Уже есть аккаунт? Войти</button>
      </Modal>
    </>
  );
};
