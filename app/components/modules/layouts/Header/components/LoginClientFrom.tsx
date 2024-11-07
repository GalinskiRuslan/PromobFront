import { PasswordInput } from "@/app/components/ui/PasswordInput/PasswordInput";
import cl from "../style.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { useRouter } from "@/langs";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenLoginModal,
  setIsOpenMobMenu,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { getUserInfo, loginWithEmail } from "@/app/store/slices/authSlice";
export const LoginClientFrom = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isDisabledBtn = () => {
    if (email.length > 4 || password.length > 7) {
      return false;
    } else {
      return true;
    }
  };
  const loginL = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        loginWithEmail({ email, password })
      ).unwrap();
      localStorage.setItem("token", response.token);
      dispatch(setIsOpenLoginModal(false));
      dispatch(setIsOpenMobMenu(false));
      await dispatch(getUserInfo()).unwrap();
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
      <p className={cl.label}>Email</p>
      <input
        className={cl.phoneInput}
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
