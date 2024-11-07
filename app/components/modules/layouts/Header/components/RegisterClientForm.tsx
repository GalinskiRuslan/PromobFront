"use client";
import { useState } from "react";
import cl from "../style.module.css";
import { PasswordInput } from "@/app/components/ui/PasswordInput/PasswordInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenMobMenu,
  setIsOpenModal,
  setIsOpenRegisterModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { getUserInfo, registerWithEmail } from "@/app/store/slices/authSlice";
import { useRouter } from "@/langs";

export const RegisterClientForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isRegisterDisabled = () => {
    if (
      password.length < 8 ||
      confirmPassword.length < 8 ||
      email.length < 4 ||
      password !== confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };
  const register = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        registerWithEmail({ email, password })
      ).unwrap();
      dispatch(setIsOpenRegisterModal(false));
      dispatch(setIsOpenMobMenu(false));
      router.push("/profile");
      await dispatch(getUserInfo()).unwrap();
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
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

      <button
        disabled={isRegisterDisabled()}
        onClick={register}
        className={cl.getSmaBtn}
      >
        Продолжить
      </button>
      <p className={cl.small_text}>
        Нажимая «Зарегистрироваться», я даю свое согласие на обработку
        персональных данных.
      </p>
    </form>
  );
};
