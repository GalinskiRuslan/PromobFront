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

interface Props {
  user: IUser;
}

export const ProfileCardEditor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  const { theme } = useTheme();
  const [statistic, setStatistic] = useState<any>(null);
  const [rating, setRating] = useState<any>(0);
  const [comments, setComments] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const getStatic = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(userStatistic()).unwrap();
      const response2 = await dispatch(userComments()).unwrap();
      setStatistic(response);
      setComments(response2);

      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  useEffect(() => {
    getStatic();
  }, []);
  if (!user) return null;
  return (
    <div className={cl.container}>
      <div className={cl.leftBlock}>
        <ProfilePictureUploader />
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
        <button className={cl.staticBlock}>
          <Image alt="map" src={theme === "dark" ? darksrc3 : src3} />
          <p>{comments?.comments?.length}</p>
        </button>
        <button className={cl.staticBlock}>
          <Image alt="map" src={theme === "dark" ? src2White : src2} />
          <p>Статистика</p>
        </button>
        <StarRating maxStars={5} onChange={setRating} />
      </div>
    </div>
  );
};
