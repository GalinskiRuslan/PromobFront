"use client";
import { ToggleSwitcher } from "@/app/components/ui/ToggleSwither/ToggleSwitcher";
import cl from "./style.module.css";
import { useState } from "react";
import { formatPhoneNumber } from "@/app/helpers/functions";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "@/langs";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { updateUserContact } from "@/app/store/slices/userSlice";
export const ContactsAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [whatsApp, setWhatsApp] = useState("+7");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [surname2, setSurname2] = useState("");
  const [nick, setNick] = useState("");
  const [isOnNickname, setIsOnNickname] = useState(false);
  const [inst, setInst] = useState("");
  const [site, setSite] = useState("");
  const isDisabled = () => {
    if (
      name.length > 0 &&
      surname.length > 0 &&
      nick.length > 0 &&
      whatsApp.replace(/\s+/g, "").length === 12
    ) {
      return false;
    } else {
      return true;
    }
  };
  const saveContacts = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        updateUserContact({
          name,
          surname,
          surname_2: surname2,
          nickname: nick,
          nickname_true: isOnNickname,
          instagram: inst,
          whatsapp: whatsApp.replace(/\s+/g, ""),
          site,
        })
      ).unwrap();
      dispatch(setVisibleLoader(false));
      router.push("/registration/info");
    } catch (error: any) {
      console.log(error);

      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.code));
    }
  };
  return (
    <div className={cl.container}>
      <p className={cl.title}>Контакты</p>
      <p className={cl.text}>
        Пожалуйста, укажите Ваши Ф.И как в удостоверении, это важно для проверки
      </p>
      <div className={cl.item}>
        <label className={cl.label}>Имя</label>
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>Фамилия</label>
        <input
          type="text"
          placeholder="Введите фамилию"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>Отчество</label>
        <input
          type="text"
          placeholder="Введите отчество"
          value={surname2}
          onChange={(e) => setSurname2(e.target.value)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>Ник</label>
        <input
          type="text"
          placeholder="Введите ник"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
      </div>
      <div className={cl.toggleCont}>
        <p>В анкете отображается ник</p>
        <ToggleSwitcher
          isOn={isOnNickname}
          handleToggle={() => setIsOnNickname(!isOnNickname)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>Инстаграм (если есть)</label>
        <input
          type="text"
          placeholder="Введите instagram"
          value={inst}
          onChange={(e) => setInst(e.target.value)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>Сайт (если есть)</label>
        <input
          type="text"
          placeholder="Введите сайт"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>
      <div className={cl.item}>
        <label className={cl.label}>WhatsApp</label>
        <input
          type="tel"
          value={whatsApp}
          onChange={(e) => setWhatsApp(formatPhoneNumber(e.target.value))}
        />
      </div>
      <div className={cl.navBtns}>
        <button className={cl.btnBack} onClick={() => router.back()}>
          Назад
        </button>
        <button
          className={cl.nextBtn}
          disabled={isDisabled()}
          onClick={saveContacts}
        >
          Далее
        </button>
      </div>
    </div>
  );
};
