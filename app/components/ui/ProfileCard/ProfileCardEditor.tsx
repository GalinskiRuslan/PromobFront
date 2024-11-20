"use client";
import { IUser } from "@/app/types";
import cl from "./style.module.css";
import ProfilePictureUploader from "../InputPhoto/ProfilePictureUploader";
import Image from "next/image";
import src from "./assets/map pin.png";
import srcW from "./assets/map pinw.png";
import src2 from "./assets/bar chart 2.png";
import src2White from "./assets/bar chart 2whitee.png";
import src3 from "./assets/circle.png";
import darksrc3 from "./assets/Vector.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/app/store/store";
import { Comment } from "../Comment/Comment";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { userComments, userStatistic } from "@/app/store/slices/userSlice";
import { useTheme } from "next-themes";
import StarRating from "../Raiting/Raiting";
import Modal from "../modal/Modal";
import dayjs from "dayjs";
import { getPaymentLink } from "@/app/store/slices/paymentSlice";

interface Props {
  user: IUser;
}

export const ProfileCardEditor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  const { theme } = useTheme();
  const [statistic, setStatistic] = useState<any>(null);
  const [isVisibleStatic, setIsVisibleStatic] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [rating, setRating] = useState<any>(0);
  const [comments, setComments] = useState<any>(null);
  const [payLink, setPayLink] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const getStatic = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(userStatistic()).unwrap();
      const response2 = await dispatch(userComments()).unwrap();
      setStatistic(response.statistic);
      setComments(response2.comments);

      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const getPayLink = async () => {
    const data = await dispatch(getPaymentLink()).unwrap();
    setPayLink(data.payment_link);
  };
  useEffect(() => {
    getStatic();
    getPayLink();
  }, []);
  if (!user) return null;
  return (
    <>
      {user.isActive.is_active && (
        <div className={cl.isActiveContainer}>
          <p className={cl.isActive}>
            Ваш аккаунт активен ещё {user.isActive.days_left} дней
          </p>
          <a href={payLink}>
            <button className={cl.payBtn}>Продлить подписку</button>
          </a>
        </div>
      )}
      <div className={cl.container}>
        <div className={cl.leftBlock}>
          <div>
            <ProfilePictureUploader />
          </div>
          <div className={cl.profileName}>
            {user.nickname_true ? (
              <p className={cl.name}>
                {user.nickname} ({user.name})
              </p>
            ) : (
              <p className={cl.name}>
                {user.surname} {user.name} {user.surname_2}
              </p>
            )}
            <div className={cl.city}>
              <Image alt="map" src={theme == "dark" ? srcW : src} />
              {cities?.find((city: any) => city.id == user?.cities_id)?.city}
            </div>
          </div>
        </div>
        <div className={cl.rightBlock}>
          <button
            className={cl.staticBlock}
            onClick={() => setIsVisibleComments(!isVisibleComments)}
          >
            <Image alt="map" src={theme === "dark" ? darksrc3 : src3} />
            <p>{comments?.length}</p>
          </button>
          <button
            className={cl.staticBlock}
            onClick={() => setIsVisibleStatic(!isVisibleStatic)}
          >
            <Image alt="map" src={theme === "dark" ? src2White : src2} />
            <p>Статистика</p>
          </button>
          <p>Рейтинг пользователя</p>
          <StarRating
            maxStars={5}
            onChange={setRating}
            readOnly={true}
            value={user.ratingAverage}
          />
          Оценок: {user.rating ? user.rating?.length : 0}
        </div>
        <Modal visible={isVisibleStatic} setVisible={setIsVisibleStatic}>
          <p className={cl.title}>Статистика</p>
          <p className={cl.statisticItem}>
            Количество показов профиля:{" "}
            <span className={cl.purpure}>{statistic?.view_count}</span>
          </p>
          <p className={cl.statisticItem}>
            Количество просмотров контактов:{" "}
            <span className={cl.purpure}>{statistic?.click_contacts}</span>
          </p>
          <p className={cl.statisticItem}>
            Количество просмотров Профиля:{" "}
            <span className={cl.purpure}>{statistic?.view_profile}</span>
          </p>
        </Modal>
        <Modal visible={isVisibleComments} setVisible={setIsVisibleComments}>
          {comments?.map((item: any) => {
            return (
              <Comment
                key={item.id}
                user_id={item.target_user_id}
                comment={item.result}
                date={dayjs(item.created_at).format("MM.DD.YYYY")}
              />
            );
          })}
        </Modal>
      </div>
    </>
  );
};
