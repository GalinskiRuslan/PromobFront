import { IUser } from "@/app/types";
import cl from "./style.module.css";
import Image from "next/image";
import mapPin from "./assets/map pin.png";
import { useDispatch, useSelector } from "react-redux";
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
import { Link } from "@/langs";
import { Portfolio } from "../../ui/Portfolio/Portfolio";
import { AppDispatch } from "@/app/store/store";
import { addContactsViewCount } from "@/app/store/slices/userSlice";
import StarRating from "../../ui/Raiting/Raiting";
type Props = {
  user: IUser;
};

const Executor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  const { categories } = useSelector((state: any) => state.categories);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<any>(0);
  const dispatch = useDispatch<AppDispatch>();
  const addViewStatic = async (user_id: number) => {
    setIsOpen(true);
    try {
      const response = await dispatch(
        addContactsViewCount({
          user_id,
        })
      ).unwrap();
    } catch (error: any) {
      console.log(error);
    }
  };
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
              <Link href={`/city/${user.cities_id}`} className={cl.city}>
                {cities?.find((city: any) => city.id == user.cities_id)?.city}
              </Link>
            </div>
            <button
              className={cl.contactsBtn}
              onClick={() => addViewStatic(user.id)}
            >
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
          Рейтинг пользователя
          <StarRating maxStars={5} onChange={setRating} />
        </div>
      </div>
      <Portfolio
        portfolio={
          !user.gallery
            ? []
            : Array.isArray(JSON.parse(user.gallery))
            ? JSON.parse(user.gallery)
            : Object.values(JSON.parse(user.gallery))
        }
      />
      <div className={cl.categories}>
        {JSON.parse(user.categories_id)?.map((item: any) => {
          return (
            <Link key={item} href={`?category=${item}`}>
              <button className={cl.cat} key={item}>
                {categories?.find((cat: any) => cat.id == item)?.category}
              </button>
            </Link>
          );
        })}
      </div>
      <Modal visible={isOpen} setVisible={setIsOpen}>
        <p className={cl.contactsTitle}> Контакты</p>
        {user.whatsapp && (
          <a
            target="_blank"
            href={`https://wa.me/${user.whatsapp?.replace(/\D/g, "")}`}
            className={cl.linkContacts}
          >
            <Image alt="site" src={whatsAppSrc} width={30} height={30} />
            <p>{user.whatsapp}</p>
          </a>
        )}
        {user.site && (
          <a
            href={`https://${user.site}`}
            className={cl.linkContacts}
            target="_blank"
          >
            <Image alt="site" src={siteSrc} width={30} height={30} />
            <p>{user.site}</p>
          </a>
        )}
        {user.instagram && (
          <a
            href={`https://instagram.com/${user.site}`}
            className={cl.linkContacts}
            target="_blank"
          >
            <Image alt="site" src={instaSrc} width={30} height={30} />
            <p>{user.instagram}</p>
          </a>
        )}
        <a href={`tel:${user.tel}`} className={cl.linkContacts} target="_blank">
          <Image alt="site" src={telSrc} width={30} height={30} />
          <p>{user.tel}</p>
        </a>
      </Modal>
    </div>
  );
};

export default Executor;
