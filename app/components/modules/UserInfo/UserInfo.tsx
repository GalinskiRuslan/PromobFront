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
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/langs";
import mapPin from "./assets/map pin.png";
import {
  addContactsViewCount,
  changeRating,
  postComment,
} from "@/app/store/slices/userSlice";
import Modal from "../../ui/modal/Modal";
import siteSrc from "./assets/icons8-сайт-50.png";
import whatsAppSrc from "./assets/icons8-whatsapp-32.png";
import instaSrc from "./assets/icons8-instagram-50.png";
import telSrc from "./assets/icons8-телефон-50.png";
import money from "./assets/Component 3.png";
import { useTheme } from "next-themes";
import datkmessageSrc from "./assets/Vectordark.png";
import StarRating from "../../ui/Raiting/Raiting";
import { getAllCategories } from "@/app/store/slices/categories";
import { IUser } from "@/app/types";
import { Comment } from "../../ui/Comment/Comment";
import dayjs from "dayjs";
import { Portfolio } from "../../ui/Portfolio/Portfolio";

type Props = { user_id: number };

export const UserInfo = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: any) => state.city);
  const { categories } = useSelector((state: any) => state.categories);
  const { user } = useSelector((state: any) => state.auth);
  const [userLocal, setUser] = useState<IUser | null>(null);
  const [commentEditor, setCommentEditor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<string>("");

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
  const changeRatingLocal = async (value: any) => {
    try {
      await dispatch(
        changeRating({ user_id: props.user_id, rating: value })
      ).unwrap();
      getUserInfo();
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorCode(error.status));
    }
  };
  useEffect(() => {
    if (user) {
      userLocal?.comments?.forEach((comment: any) => {
        if (comment.user_id == user.id) {
          setComment(comment.result);
        }
      });
    }
  }, [user, userLocal]);

  const sendComment = async () => {
    try {
      await dispatch(
        postComment({ target_user_id: props.user_id, comment })
      ).unwrap();
      getUserInfo();
      setCommentEditor(false);
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorCode(error.status));
    }
  };

  return (
    userLocal && (
      <div className={cl.container}>
        <div className={cl.topContCard}>
          <div className={cl.leftContent}>
            <Image
              alt="photo"
              src={userLocal.photos}
              width={150}
              height={150}
              className={cl.img}
            />
            <div className={cl.secondTop}>
              {userLocal.nickname_true ? (
                <p className={cl.nick}>
                  {userLocal.nickname} ({userLocal.name})
                </p>
              ) : (
                <p className={cl.nick}>
                  {userLocal.name} {userLocal.surname_2}
                </p>
              )}
              <div className={cl.mapCont}>
                <Image alt="map" src={mapPin} />
                <Link href={`/city/${userLocal.cities_id}`} className={cl.city}>
                  {
                    cities?.find((city: any) => city.id == userLocal.cities_id)
                      ?.city
                  }
                </Link>
              </div>
              <button
                className={cl.contactsBtn}
                onClick={() => addViewStatic(userLocal.id)}
              >
                Контакты
              </button>
            </div>
          </div>
          <div className={cl.rightContent}>
            <div
              className={cl.commentBtn}
              onClick={() => {
                commentRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Image alt="message" src={datkmessageSrc} />
              {userLocal.comments?.length} отзывов
            </div>
            <p>Рейтинг пользователя</p>
            <StarRating
              maxStars={5}
              onChange={changeRatingLocal}
              value={Math.floor(userLocal.ratingAverage)}
              readOnly={user?.role === "client" ? false : true}
            />
            Оценок: {userLocal.rating ? userLocal.rating?.length : 0}
          </div>
        </div>
        <div className={cl.categories}>
          {JSON.parse(userLocal.categories_id)?.map((item: any) => {
            return (
              <Link key={item} href={`?category=${item}`}>
                <button className={cl.cat} key={item}>
                  {categories?.find((cat: any) => cat.id == item)?.category}
                </button>
              </Link>
            );
          })}
        </div>
        <Portfolio
          portfolio={
            !userLocal.gallery
              ? []
              : Array.isArray(JSON.parse(userLocal.gallery))
              ? JSON.parse(userLocal.gallery)
              : Object.values(JSON.parse(userLocal.gallery))
          }
        />
        <div className={cl.cardAbout}>
          <div className={cl.costContainer}>
            <Image src={money} alt="money" />
            <div>
              <p className={cl.cost}>стоимость</p>
              <p className={cl.costBold}>
                От {userLocal.cost_from} ₸ До {userLocal.cost_up} ₸
              </p>
            </div>
          </div>
          {userLocal.details && (
            <div className={cl.aboutContainer}>
              <p className={cl.costBold}>Детали работы</p>
              <p className={cl.text}>{userLocal.details}</p>
            </div>
          )}
          {userLocal.about_yourself && (
            <div className={cl.aboutContainer}>
              <p className={cl.costBold}>Обо мне</p>
              <p className={cl.text}>{userLocal.about_yourself}</p>
            </div>
          )}
        </div>
        <div className={cl.commentsContainer} ref={commentRef}>
          <div className={cl.comments}>
            <p className={cl.commentsTitle}>
              Отзывы ({userLocal.comments?.length})
            </p>
            <button
              className={cl.addcomentbtn}
              onClick={() => setCommentEditor(true)}
            >
              Добавить отзыв
            </button>
          </div>
          {userLocal.comments?.map((item: any) => {
            return (
              <Comment
                key={item.id}
                user_id={item.user_id}
                comment={item.result}
                date={dayjs(item.created_at).format("MM.DD.YYYY")}
              />
            );
          })}
        </div>
        <Modal visible={isOpen} setVisible={setIsOpen}>
          <p className={cl.contactsTitle}> Контакты</p>
          {userLocal.whatsapp && (
            <a
              target="_blank"
              href={`https://wa.me/${userLocal.whatsapp?.replace(/\D/g, "")}`}
              className={cl.linkContacts}
            >
              <Image alt="site" src={whatsAppSrc} width={30} height={30} />
              <p>{userLocal.whatsapp}</p>
            </a>
          )}
          {userLocal.site && (
            <a
              href={`https://${userLocal.site}`}
              className={cl.linkContacts}
              target="_blank"
            >
              <Image alt="site" src={siteSrc} width={30} height={30} />
              <p>{userLocal.site}</p>
            </a>
          )}
          {userLocal.instagram && (
            <a
              href={`https://instagram.com/${userLocal.site}`}
              className={cl.linkContacts}
              target="_blank"
            >
              <Image alt="site" src={instaSrc} width={30} height={30} />
              <p>{userLocal.instagram}</p>
            </a>
          )}
          <a
            href={`tel:${userLocal.tel}`}
            className={cl.linkContacts}
            target="_blank"
          >
            <Image alt="site" src={telSrc} width={30} height={30} />
            <p>{userLocal.tel}</p>
          </a>
        </Modal>
        <Modal visible={commentEditor} setVisible={setCommentEditor}>
          <div className={cl.commentEditor}>
            {user?.role !== "client" && (
              <p>Отзывы могут оставлять только клиенты</p>
            )}
            {user?.role == "client" && (
              <div className={cl.commentForm}>
                <p>Оставить отзыв</p>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className={cl.textarea}
                  placeholder="Введите текст"
                />
                <button onClick={sendComment} className={cl.sendBtn}>
                  Отправить
                </button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  );
};
