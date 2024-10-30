"use client";
import { useState } from "react";
import cl from "../style.module.css";

export const RegisterClientForm = () => {
  const [email, setEmail] = useState("");
  return (
    <form className={cl.form} onSubmit={(e) => e.preventDefault()}>
      <p className={cl.label}>E-mail</p>
      <input
        className={cl.phoneInput}
        placeholder="Введите e-mail"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className={cl.text}>
        На эту почту вы получите письмо со ссылкой для подтверждения
      </p>
      <button className={cl.getSmaBtn}>Продолжить</button>
      <p className={cl.text}>
        Нажимая «Зарегистрироваться», я даю свое согласие на обработку
        персональных данных.
      </p>
    </form>
  );
};
