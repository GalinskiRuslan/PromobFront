"use client";
import Image from "next/image";
import cl from "./filtersstyle.module.css";
import srcFilterImg from "./assets/Frame 86.png";
import { useRef, useState } from "react";
import { ToggleSwitcher } from "../../ui/ToggleSwither/ToggleSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setRatingFilter } from "@/app/store/slices/usersSlice";

type Props = {};

export const Filters = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useSelector((state: any) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement>(null);

  console.log(filters);

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
            <ToggleSwitcher
              handleToggle={() =>
                dispatch(setRatingFilter(!filters.isRatingOrder))
              }
              isOn={filters.isRatingOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};
