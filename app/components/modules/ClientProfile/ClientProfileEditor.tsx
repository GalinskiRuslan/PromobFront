import { IUser } from "@/app/types";
import cl from "./style.module.css";
import ProfilePictureUploader from "../../ui/InputPhoto/ProfilePictureUploader";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import src from "./assets/map pin.png";
import srcW from "./assets/map pinw.png";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/app/store/store";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { updateUserContact } from "@/app/store/slices/userSlice";
import Modal from "../../ui/modal/Modal";
import { formatPhoneNumber } from "@/app/helpers/functions";

type Props = { user: IUser };

export const ClientProfileEditor = ({ user }: Props) => {
  const { theme } = useTheme();
  const { cities } = useSelector((state: any) => state.city);
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [surname, setSurname] = useState("");
  const [succsessMessageVisible, setSuccsessMessageVisible] = useState(false);
  const [whatsApp, setWhatsApp] = useState("+7");
  const [surname2, setSurname2] = useState("");

  const saveContactsProfile = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        updateUserContact({
          name,
          surname,
          surname_2: surname2,
          nickname: "11",
          nickname_true: false,
          instagram: "",
          whatsapp: whatsApp.replace(/\s+/g, ""),
          site: "",
        })
      ).unwrap();
      setSuccsessMessageVisible(true);
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      console.log(error);
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.code));
    }
  };
  useEffect(() => {
    if (user) {
      setWhatsApp(user.whatsapp ? user.whatsapp.replace(/\s+/g, "") : "");
      setName(user.name ? user.name : "");
      setSurname(user.surname ? user.surname : "");
      setSurname2(user.surname_2 ? user.surname_2 : "");
    }
  }, [user]);
  const isDisabledInProfile = () => {
    if (
      name.length > 0 &&
      surname.length > 0 &&
      whatsApp.replace(/\s+/g, "").length === 12 &&
      (name !== user?.name ||
        surname !== user?.surname ||
        whatsApp !== user?.whatsapp)
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <div className={cl.container}>
        <ProfilePictureUploader />
        <div className={cl.profileName}>
          <p className={cl.name}>
            {user.surname} {user.name} {user.surname_2}
          </p>
        </div>
      </div>
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
        <label className={cl.label}>WhatsApp</label>
        <input
          type="tel"
          value={whatsApp}
          onChange={(e) => setWhatsApp(formatPhoneNumber(e.target.value))}
        />
      </div>
      <button
        disabled={isDisabledInProfile()}
        className={cl.nextBtn}
        onClick={saveContactsProfile}
      >
        Сохранить
      </button>
      <Modal
        visible={succsessMessageVisible}
        setVisible={setSuccsessMessageVisible}
      >
        <p style={{ margin: "40px 0", color: "green", fontSize: "24px" }}>
          Контакты Успешно сохранены!
        </p>
      </Modal>
    </>
  );
};
