import { IUser } from "@/app/types";
import cl from "./style.module.css";
import Image from "next/image";
import mapPin from "./assets/map pin.png";
import { useSelector } from "react-redux";
import messageSrc from "./assets/Vector.png";
import datkmessageSrc from "./assets/Vectordark.png";
import { useTheme } from "next-themes";
import nophoto from "./assets/Group2.png";
import Modal from "../../ui/modal/Modal";
import { useState } from "react";
import siteSrc from "./assets/icons8-сайт-50.png";
import whatsAppSrc from "./assets/icons8-whatsapp-32.png";
import instaSrc from "./assets/icons8-instagram-50.png";
import telSrc from "./assets/icons8-телефон-50.png";
type Props = {
  user: IUser;
};

const Executor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cl.executor}>
      <div className={cl.headContent}>
        <div className={cl.leftContent}>
          {user.photos ? (
            <Image
              alt="photo"
              src={user.photos}
              width={150}
              height={150}
              className={cl.img}
            />
          ) : (
            <Image
              alt="nophoto"
              src={nophoto}
              width={150}
              height={150}
              className={cl.img}
            />
          )}
          <div className={cl.secondTop}>
            {user.nickname_true ? (
              <p className={cl.nick}>
                {user.nickname} ({user.name})
              </p>
            ) : (
              <p className={cl.nick}>
                {user.name} {user.surname_2}
              </p>
            )}
            <div className={cl.mapCont}>
              <Image alt="map" src={mapPin} />
              <p className={cl.city}>
                {cities?.find((city: any) => city.id == user.cities_id)?.city}
              </p>
            </div>
            <button className={cl.contactsBtn} onClick={() => setIsOpen(true)}>
              Контакты
            </button>
          </div>
        </div>
        <div className={cl.rightContent}>
          <div className={cl.commentBtn}>
            <Image
              alt="message"
              src={theme == "dark" ? messageSrc : datkmessageSrc}
            />
            {user.comments?.length} отзывов
          </div>
        </div>
      </div>
      <Modal visible={isOpen} setVisible={setIsOpen}>
        <p className={cl.contactsTitle}> Контакты</p>
        <a
          target="_blank"
          href={`https://wa.me/${user.whatsapp?.replace(/\D/g, "")}`}
          className={cl.linkContacts}
        >
          <Image alt="site" src={whatsAppSrc} width={30} height={30} />
          <p>{user.whatsapp}</p>
        </a>
        <a
          href={`https://${user.site}`}
          className={cl.linkContacts}
          target="_blank"
        >
          <Image alt="site" src={siteSrc} width={30} height={30} />
          <p>{user.site}</p>
        </a>
        <a
          href={`https://instagram.com/${user.site}`}
          className={cl.linkContacts}
          target="_blank"
        >
          <Image alt="site" src={instaSrc} width={30} height={30} />
          <p>{user.instagram}</p>
        </a>
        <a href={`tel:${user.tel}`} className={cl.linkContacts} target="_blank">
          <Image alt="site" src={telSrc} width={30} height={30} />
          <p>{user.tel}</p>
        </a>
      </Modal>
    </div>
  );
};

export default Executor;
