"use client";
import React, { useState } from "react";
import { CityChangeButton } from "./components/CityChangeButton";
import { Link } from "@/langs";
import Image from "next/image";
import src from "./assets/Group 3.png";
import srcLight from "./assets/Group 3 (1).png";
import { useTheme } from "next-themes";
import cl from "./style.module.css";
import { LangChanger } from "./components/LangChanger";
import { ThemeCganger } from "./components/ThemeCganger";
import { RegisterButton } from "./components/RegisterButton";
import { LoginButton } from "./components/LoginButton";

export const Header = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
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
      <div className={isOpen ? cl.rightItems_open : cl.rightItems}>
        <button className={cl.closeBtnMob} onClick={() => setIsOpen(false)}>
          x
        </button>
        <LangChanger />
        <RegisterButton
          visible={isOpenRegisterForm}
          setVisible={setIsOpenRegisterForm}
          setVisibleLogin={setIsOpenLoginForm}
        />
        <LoginButton />
        <ThemeCganger />
      </div>
      <button className={cl.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <span className={cl.line}></span>
      </button>
      <div
        className={isOpen ? cl.overview_open : cl.overview_close}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};
