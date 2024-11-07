"use client";
import { IUser } from "@/app/types";
import cl from "./style.module.css";
import ProfilePictureUploader from "../InputPhoto/ProfilePictureUploader";
import Image from "next/image";
import src from "./assets/map pin.png";
import src2 from "./assets/bar chart 2.png";
import src3 from "./assets/circle.png";
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

interface Props {
  user: IUser;
}

export const ProfileCardEditor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  const [statistic, setStatistic] = useState<any>(null);
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
          <p className={cl.name}>
            {user.surname} {user.name} {user.surname_2}
          </p>
          <div className={cl.city}>
            <Image alt="map" src={src} />
            {cities?.find((city: any) => city.id == user?.cities_id)?.city}
          </div>
        </div>
      </div>
      <div className={cl.rightBlock}>
        <button className={cl.staticBlock}>
          <Image alt="map" src={src3} />
          <p>{comments.comments.length}</p>
        </button>
        <button className={cl.staticBlock}>
          <Image alt="map" src={src2} />
          <p>{statistic.statistic.view_count}</p>
        </button>
      </div>
    </div>
  );
};
