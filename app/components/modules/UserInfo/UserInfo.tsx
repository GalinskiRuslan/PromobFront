"use client";
import { AppDispatch } from "@/app/store/store";
import cl from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { getUserInfoById } from "@/app/store/slices/usersSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/langs";
import mapPin from "./assets/map pin.png";
import { addContactsViewCount } from "@/app/store/slices/userSlice";
import Modal from "../../ui/modal/Modal";
import siteSrc from "./assets/icons8-сайт-50.png";
import whatsAppSrc from "./assets/icons8-whatsapp-32.png";
import instaSrc from "./assets/icons8-instagram-50.png";
import telSrc from "./assets/icons8-телефон-50.png";
import { useTheme } from "next-themes";
import datkmessageSrc from "./assets/Vectordark.png";
import StarRating from "../../ui/Raiting/Raiting";
import { getAllCategories } from "@/app/store/slices/categories";

type Props = { user_id: number };

export const UserInfo = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: any) => state.city);
  const { categories } = useSelector((state: any) => state.categories);
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<any>(0);
  const { theme } = useTheme();

  const getAllCategoriesLoc = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(getAllCategories()).unwrap();
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const getUserInfo = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        getUserInfoById({ id: props.user_id })
      ).unwrap();
      setUser(response.user);
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorCode(error.status));
    }
  };
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
  useEffect(() => {
    getUserInfo();
    getAllCategoriesLoc();
  }, []);

  return (
    user && (
      <div className={cl.container}>
        <div className={cl.topContCard}>
          <div className={cl.leftContent}>
            <Image
              alt="photo"
              src={user.photos}
              width={150}
              height={150}
              className={cl.img}
            />
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
              <Image alt="message" src={datkmessageSrc} />
              {user.comments?.length} отзывов
            </div>
            <p>Рейтинг пользователя</p>
            <StarRating maxStars={5} onChange={setRating} />
          </div>
        </div>
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
          <a
            href={`tel:${user.tel}`}
            className={cl.linkContacts}
            target="_blank"
          >
            <Image alt="site" src={telSrc} width={30} height={30} />
            <p>{user.tel}</p>
          </a>
        </Modal>
      </div>
    )
  );
};
