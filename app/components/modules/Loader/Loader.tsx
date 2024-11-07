"use client";
import cl from "./style.module.css";
import { useSelector } from "react-redux";

export const Loader = () => {
  const { loaderVisible } = useSelector((state: any) => state.app);
  if (loaderVisible) {
    return (
      <div className={cl.loaderContainer}>
        <span className={cl.loader}></span>
        <div className={cl.overflow}></div>
      </div>
    );
  } else {
    return null;
  }
};
