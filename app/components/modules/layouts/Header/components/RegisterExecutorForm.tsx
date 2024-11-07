"use client";
import { useEffect, useState } from "react";
import cl from "../style.module.css";
import { formatPhoneNumber } from "@/app/helpers/functions";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenMobMenu,
  setIsOpenModal,
  setIsOpenRegisterModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import {
  getSmsCode,
  getUserInfo,
  registrWithCode,
} from "@/app/store/slices/authSlice";
import { Smsinner } from "@/app/components/ui/SmsInner/Smsinner";
import { PasswordInput } from "@/app/components/ui/PasswordInput/PasswordInput";
import { useRouter } from "@/langs";
export const RegisterExecutorForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [phone, setPhone] = useState("+7");
  const [code, setCode] = useState(["", "", "", ""]);
  const [countTry, setCountTry] = useState(3);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeId, setCodeId] = useState<string | null>("");
  const getSms = async () => {
    dispatch(setVisibleLoader(true));
    setCountTry(3);
    try {
      const formatNum = phone.replace(/\s+/g, "");
      const response = await dispatch(
        getSmsCode({ phone: formatNum })
      ).unwrap();
      setCodeId(response.code_id);
      sessionStorage.setItem("code_id", response.code_id);
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const registrationWithCode = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const code_id = sessionStorage.getItem("code_id");
      const response = await dispatch(
        registrWithCode({
          code_id: code_id ? code_id : "",
          code: code.join(""),
          password: password,
        })
      ).unwrap();
      localStorage.setItem("token", response.token);
      sessionStorage.removeItem("code_id");
      setCodeId(null);
      dispatch(setIsOpenRegisterModal(false));
      dispatch(setIsOpenMobMenu(false));
      await dispatch(getUserInfo()).unwrap();
      router.push("/registration/instruction");
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      if (error.errorText == "Неверный код") {
        setCountTry(countTry - 1);
      }
      if (countTry < 2) {
        setCodeId(null);
        setCountTry(3);
        setPassword("");
        setConfirmPassword("");
        sessionStorage.removeItem("code_id");
        setCode(["", "", "", ""]);
      }
      if (error.errorText === "Код не найден") {
        setCodeId(null);
        setCountTry(3);
        setCode(["", "", "", ""]);
        setConfirmPassword("");
        setPassword("");
        sessionStorage.removeItem("code_id");
      }
      if (error.status == 500) {
        setCodeId(null);
        setCountTry(3);
        setCode(["", "", "", ""]);
        setConfirmPassword("");
        setPassword("");
        sessionStorage.removeItem("code_id");
      }
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const isDisabledBtn = () => {
    if (phone.replace(/\s+/g, "").length === 12) {
      return false;
    } else {
      return true;
    }
  };
  const isRegisterDisabled = () => {
    if (
      password.length < 8 ||
      confirmPassword.length < 8 ||
      code.join("").length < 4 ||
      password !== confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("code_id")) {
      setCodeId(sessionStorage.getItem("code_id"));
    }
  }, [sessionStorage.getItem("code_id")]);
  if (codeId) {
    return (
      <div className={cl.form}>
        <p className={cl.smsInner_text}>Введите код из СМС</p>
        <Smsinner digits={code} changeHandler={setCode} submit={() => {}} />
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Придумайте пароль"
        />
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Подтвердите пароль"
        />
        {countTry < 3 && (
          <p className={cl.countTry}>Осталось попыток - {countTry}</p>
        )}
        <button
          disabled={isRegisterDisabled()}
          className={cl.getSmaBtn}
          onClick={() => registrationWithCode()}
        >
          Зарегистрироваться
        </button>
      </div>
    );
  } else {
    return (
      <div className={cl.form}>
        <p className={cl.label}>Номер телефона</p>
        <input
          className={cl.phoneInput}
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        />
        <p className={cl.text}>
          На этот номер вы получите SMS с кодом подтверждения авторизации
        </p>
        <button
          disabled={isDisabledBtn()}
          className={cl.getSmaBtn}
          onClick={() => getSms()}
        >
          Продолжить
        </button>
        <p className={cl.small_text}>
          Нажимая «Зарегистрироваться», я даю свое согласие на обработку
          персональных данных.
        </p>
      </div>
    );
  }
};
