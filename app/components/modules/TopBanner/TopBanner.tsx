import cl from "./style.module.css";
type Props = {};

export const TopBanner = (props: Props) => {
  return (
    <div className={cl.container}>
      <div className={cl.leftContainer}>
        <h1 className={cl.title}>
          Платформа №1
          <br />
          <span className={cl.smalltextTitle}>
            для медиа-профессионалов в Казахстане
          </span>
        </h1>
        <p className={cl.text}>
          Находите лучших специалистов для ваших проектов
        </p>
        <br />

        <p className={cl.text}>Создайте портфолио и начните получать заказы</p>
        <br />
        <p className={cl.text}>Лучшие специалисты только у нас на платформе</p>
      </div>
      <div className={cl.rightContainer}>
        <p className={cl.text12}>
          Просматривайте
          <br /> проверенные портфолио
        </p>
        <p className={cl.text22}>
          Прямое общение с<br /> профессионалами
        </p>
        <p className={cl.text32}>
          Удобный и интуитивный
          <br /> интерфейс
        </p>
      </div>
    </div>
  );
};
