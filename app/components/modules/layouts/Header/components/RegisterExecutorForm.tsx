"use client";
import { useState } from "react";
import cl from "../style.module.css";
import { formatPhoneNumber } from "@/app/helpers/functions";
export const RegisterExecutorForm = () => {
  const [phone, setPhone] = useState("+7");
  return (
    <form className={cl.form} onSubmit={(e) => e.preventDefault()}>
      <p className={cl.label}>Номер телефона</p>
      <input
        className={cl.phoneInput}
        required
        type="text"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
      />
      <p className={cl.text}>
        На этот номер вы получите SMS с кодом подтверждения авторизации
      </p>
      <button className={cl.getSmaBtn}>Продолжить</button>
      <p className={cl.text}>
        Нажимая «Зарегистрироваться», я даю свое согласие на обработку
        персональных данных.
      </p>
    </form>
  );
};
