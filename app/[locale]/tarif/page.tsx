"use client";
import { useDispatch } from "react-redux";
import cl from "./style.module.css";
import { AppDispatch } from "@/app/store/store";
import { getPaymentLink } from "@/app/store/slices/paymentSlice";
import { useEffect, useState } from "react";
export default function Tarif() {
  const dispatch = useDispatch<AppDispatch>();
  const [payLink, setPayLink] = useState<any>(null);
  const getPayLink = async () => {
    // const data = await dispatch(getPaymentLink()).unwrap();
    // setPayLink(data.payment_link);
  };
  useEffect(() => {
    getPayLink();
  }, []);
  return (
    <>
      <div className={cl.container}>
        <p className={cl.title}>Добро пожаловать в наш сервис!</p>
        <p className={cl.text}>
          Присоединившись к нам, вы получите доступ к множеству возможностей,
          помогающих вам расти, развиваться и зарабатывать:
        </p>
        <ul className={cl.list}>
          <li className={cl.li}>
            <span className={cl.purepure}>Добавление категорий: </span>Расширьте
            свой профиль, добавив до двух категорий, чтобы представить себя в
            различных областях
          </li>
          <li className={cl.li}>
            <span className={cl.purepure}>Оформление портфолио: </span>Создайте
            профессиональное портфолио, подчеркивающее ваш опыт и навыки
          </li>
          <li className={cl.li}>
            <span className={cl.purepure}>Отображение опыта: </span>Покажите ваш
            опыт и достижения, чтобы клиенты могли лучше оценить ваши навыки
          </li>
          <li className={cl.li}>
            <span className={cl.purepure}>Поиск клиентов: </span>Используйте наш
            сервис для поиска новых клиентов и возможностей.
          </li>
        </ul>
        <p className={cl.title2}>
          Все это доступно всего за
          <span
            className={cl.purepure}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <del style={{ marginRight: "8px" }}>10000</del>
            <span>5000</span> тг
          </span>{" "}
          (для новых пользователей) в месяц! Присоединяйтесь к нам сегодня,
          чтобы начать свой путь к успеху!
        </p>
      </div>
      <a href={payLink}>
        <button className={cl.payBtn}>Оплатить</button>
      </a>
    </>
  );
}
