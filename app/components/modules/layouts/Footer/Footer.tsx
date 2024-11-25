import cl from "./style.module.css";
import Image from "next/image";
import whatsapp from "./assets/whatsApp.png";
import telegramm from "./assets/telega.png";
import insta from "./assets/instagram.png";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <div className={cl.container}>
      <div className={cl.innerContainer}>
        <div>
          <a href="/">
            <button className={cl.proBtn}>PROmobilograf</button>
          </a>
        </div>
        <div>
          <p className={cl.title}>Наши социальные сети</p>
          <div className={cl.socialCont}>
            <a href="https://wa.me/77022638953">
              <Image src={whatsapp} alt="wp" />
            </a>
            <a href="https://t.me/@promobilograf_kz">
              <Image src={telegramm} alt="telega" />
            </a>
            <a href="https://www.instagram.com/promobilograf_kz?igsh=MTNpdGtzcG8yNXpxNQ==">
              <Image src={insta} alt="inst" />
            </a>
          </div>
        </div>
      </div>
      <p className={cl.copyriter}>© 2024 Все права защищены</p>
    </div>
  );
};
