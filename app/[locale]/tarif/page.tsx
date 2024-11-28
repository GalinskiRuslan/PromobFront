"use client";
import { useDispatch } from "react-redux";
import cl from "./style.module.css";
import { AppDispatch } from "@/app/store/store";
import { getPaymentLink } from "@/app/store/slices/paymentSlice";
import { useEffect, useState } from "react";
import { PaymentCard } from "./paymentCard/PaymentCard";
export default function Tarif() {
  const dispatch = useDispatch<AppDispatch>();
  const [payLink, setPayLink] = useState<any>(null);
  const getPayLink = async () => {
    const data = await dispatch(getPaymentLink()).unwrap();
    setPayLink(data.payment_link);
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
            {/* <del style={{ marginRight: "8px" }}>10000</del> */}
            <span>3000</span> ₸
          </span>
          в месяц! Присоединяйтесь к нам сегодня, чтобы начать свой путь к
          успеху!
        </p>
        <p className={cl.text}>
          Мы постоянно совершенствуем нашу платформу, чтобы вы могли
          сосредоточиться на своем творчестве и достижении новых высот. Каждое
          обновление — это шаг навстречу удобству, эффективности и инновациям,
          которые помогут вам развиваться как медиаспециалисту. Подписка — это
          не только доступ к улучшенным инструментам и новым возможностям, но и
          ваша поддержка нашего роста. Благодаря вам мы можем быстрее внедрять
          передовые решения, чтобы сделать вашу работу еще более продуктивной.
          Присоединяйтесь к сообществу профессионалов, которые уже инвестируют в
          свое будущее. Вместе мы сможем построить платформу, которая станет
          неотъемлемой частью успеха каждого медиаспециалиста.
        </p>
      </div>
      <PaymentCard linkToPay={payLink} />
    </>
  );
}
