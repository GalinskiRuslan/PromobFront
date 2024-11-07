"use client";

import { PasswordInput } from "@/app/components/ui/PasswordInput/PasswordInput";
import { useState } from "react";
import cl from "../style.module.css";
import { formatPhoneNumber } from "@/app/helpers/functions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenLoginModal,
  setIsOpenMobMenu,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { getUserInfo, login } from "@/app/store/slices/authSlice";
import { useRouter } from "@/langs";

export const LoginExecutorForm = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+7");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isDisabledBtn = () => {
    if (phone.replace(/\s+/g, "").length > 12 || password.length > 7) {
      return false;
    } else {
      return true;
    }
  };
  const loginL = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const formatTel = phone.replace(/\s+/g, "");
      const response = await dispatch(
        login({ phone: formatTel, password })
      ).unwrap();
      localStorage.setItem("token", response.token);
      await dispatch(getUserInfo()).unwrap();
      dispatch(setIsOpenLoginModal(false));
      dispatch(setIsOpenMobMenu(false));
      router.push("/profile");
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
    <div>
      <p className={cl.label}>Номер телефона</p>
      <input
        className={cl.phoneInput}
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
      />
      <p className={cl.label}>Пароль</p>
      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Введите пароль"
      />
      <button
        disabled={isDisabledBtn()}
        className={cl.getSmaBtn}
        onClick={() => loginL()}
      >
        Войти
      </button>
    </div>
  );
};
