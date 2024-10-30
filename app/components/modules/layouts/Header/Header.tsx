"use client";
import React from "react";
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
      <div className={cl.rightItems}>
        <LangChanger />
        <RegisterButton />
        <LoginButton />
        <ThemeCganger />
      </div>
    </div>
  );
};
