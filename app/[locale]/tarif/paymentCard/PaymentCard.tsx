import cl from "./paymentStyle.module.css";

type Props = { linkToPay: string };

export const PaymentCard = (props: Props) => {
  return (
    <div className={cl.container}>
      <p className={cl.title}>Месячная подписка</p>
      <p className={cl.subtitle}>
        Вы получите полный доступ к платформе, сможете улучшать свое портфолио,
        получать заказы, а также просматривать статистику вашего профиля
      </p>
      <p className={cl.text}>
        <span className={cl.price}>3000 ₸</span> в месяц
      </p>
      <a href={props.linkToPay}>
        <button className={cl.payBtn}>Оплатить</button>
      </a>
    </div>
  );
};
