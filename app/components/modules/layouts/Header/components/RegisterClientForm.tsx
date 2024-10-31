"use client";
import { useState } from "react";
import cl from "../style.module.css";
import { PasswordInput } from "@/app/components/ui/PasswordInput/PasswordInput";

export const RegisterClientForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
      <p className={cl.label}>Пароль</p>
      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Придумайте пароль"
      />
      <PasswordInput
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Подтвердите пароль"
      />

      <button className={cl.getSmaBtn}>Продолжить</button>
      <p className={cl.small_text}>
        Нажимая «Зарегистрироваться», я даю свое согласие на обработку
        персональных данных.
      </p>
    </form>
  );
};
