"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import sun from "../assets/sun.png";
import activeSun from "../assets/sun-active.png";
import moon from "../assets/moon.png";
import moonActive from "../assets/moon-active.png";
import cl from "../style.module.css";
import { useEffect } from "react";

export const ThemeCganger = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <div className={cl.themeChangeContainer}>
      <button className={cl.themeChangeBtn} onClick={() => setTheme("dark")}>
        <Image src={theme == "dark" ? moonActive : moon} alt="light" />
      </button>
      <button className={cl.themeChangeBtn} onClick={() => setTheme("light")}>
        <Image src={theme == "dark" ? sun : activeSun} alt="dark" />
      </button>
    </div>
  );
};
