"use client";
import { AppDispatch } from "@/app/store/store";
import cl from "./style.module.css";
import { useDispatch } from "react-redux";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { getUserInfoById } from "@/app/store/slices/usersSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IUser } from "@/app/types";
import noPhoto from "./Group2.png";

type Props = { user_id: number; comment: string; date: string };

export const Comment = (props: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const dispatch = useDispatch<AppDispatch>();
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
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={cl.container}>
      <div className={cl.photo}>
        <Image
          alt="photo"
          src={user?.photos ? user.photos : noPhoto}
          width={100}
          height={100}
          className={cl.img}
        />
      </div>
      <div className={cl.rightContent}>
        <div className={cl.topContent}>
          <p className={cl.name}>
            {user?.surname} {user?.name} {user?.surname_2}
          </p>
          <p className={cl.date}>Отзыв оставлен {props.date}</p>
        </div>
        <p className={cl.comment}>{props.comment}</p>
      </div>
    </div>
  );
};
