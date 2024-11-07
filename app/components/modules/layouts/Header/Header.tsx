"use client";
import React, { useEffect, useState } from "react";
import { CityChangeButton } from "./components/CityChangeButton";
import { Link, useRouter } from "@/langs";
import Image from "next/image";
import src from "./assets/Group 3.png";
import srcLight from "./assets/Group 3 (1).png";
import { useTheme } from "next-themes";
import cl from "./style.module.css";
import { LangChanger } from "./components/LangChanger";
import { ThemeCganger } from "./components/ThemeCganger";
import { RegisterButton } from "./components/RegisterButton";
import { LoginButton } from "./components/LoginButton";
import { AppDispatch } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenMobMenu,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { clearUser, getUserInfo } from "@/app/store/slices/authSlice";
import profImgWhite from "./assets/user-white.png";
import exitIcon from "./assets/download-white.png";
import exitIconDark from "./assets/download.png";
import profImgDark from "./assets/user.png";
import { useScrollLock } from "@/app/hooks/useScrollLock";
import mobLogoSrc from "./assets/moblogo.png";
import { CategoryList } from "../../CategoryList/CategoryList";

export const Header = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenMobMenu } = useSelector((state: any) => state.app);
  const { user } = useSelector((state: any) => state.auth);
  const { lock, unlock } = useScrollLock({ autoLock: false });
  const getUserInfoL = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(getUserInfo()).unwrap();
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const goToProfile = () => {
    dispatch(setIsOpenMobMenu(false));
    router.push("/profile");
  };
  const logout = () => {
    dispatch(setIsOpenMobMenu(false));
    localStorage.removeItem("token");
    dispatch(clearUser());
    router.push("/");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfoL();
    }
  }, []);
  useEffect(() => {
    if (isOpenMobMenu) {
      lock();
    } else {
      unlock();
    }
    // Очистка эффекта при размонтировании компонента
    return () => unlock();
  }, [isOpenMobMenu, lock, unlock]);
  return (
    <div className={cl.container}>
      <div className={cl.leftItems}>
        <Link href={"/"}>
          {theme === "dark" ? (
            <Image src={src} alt="logo" />
          ) : (
            <Image src={srcLight} alt="logo" />
          )}
        </Link>
        <CityChangeButton />
      </div>
      <div className={isOpenMobMenu ? cl.rightItems_open : cl.rightItems}>
        <Image src={mobLogoSrc} alt="logo" className={cl.moblogo} />
        <button
          className={cl.closeBtnMob}
          onClick={() => dispatch(setIsOpenMobMenu(false))}
        >
          x
        </button>
        <LangChanger />
        {user ? (
          <div className={cl.profileContainer}>
            <button className={cl.profileBtn} onClick={goToProfile}>
              <Image
                alt="profileClient"
                src={theme === "dark" ? profImgWhite : profImgDark}
              />
            </button>
            <button className={cl.profileBtn} onClick={logout}>
              <Image
                alt="profileClient"
                src={theme === "dark" ? exitIcon : exitIconDark}
              />
            </button>
          </div>
        ) : (
          <>
            <RegisterButton />
            <LoginButton />
          </>
        )}
        <ThemeCganger />
        <div className={cl.mobileCategories}>
          {isOpenMobMenu && <CategoryList />}
        </div>
      </div>
      <button
        className={cl.hamburger}
        onClick={() => dispatch(setIsOpenMobMenu(true))}
      >
        <span className={cl.line}></span>
      </button>
      <div
        className={isOpenMobMenu ? cl.overview_open : cl.overview_close}
        onClick={() => dispatch(setIsOpenMobMenu(false))}
      ></div>
    </div>
  );
};
