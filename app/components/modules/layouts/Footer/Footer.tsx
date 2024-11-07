import cl from "./style.module.css";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <div className={cl.container}>
      <div className={cl.innerContainer}>
        <div>
          <div>
            <button className={cl.proBtn}>PROmobilograf</button>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
