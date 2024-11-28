"use client";
import Image from "next/image";
import cl from "./filtersstyle.module.css";
import srcFilterImg from "./assets/Frame 86.png";
import { useRef, useState } from "react";

type Props = {};

export const Filters = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleContent = () => {
    if (ref.current) {
      if (isOpen) {
        // Скрыть блок
        ref.current.style.height = "0px";
      } else {
        // Показать блок
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
      setIsOpen(!isOpen);
    }
  };
  return (
    <>
      <div className={cl.container}>
        <div className={cl.filterTitle} onClick={toggleContent}>
          <Image src={srcFilterImg} alt="filter" />
        </div>
        <div className={isOpen ? cl.contentOpen : cl.content} ref={ref}>
          <div className={cl.filterItem}>
            <label>Сортировать по рейтингу</label>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </>
  );
};
