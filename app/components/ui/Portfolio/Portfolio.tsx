import cl from "./style.module.css";
import Image from "next/image";
import videoSrc from "./assets/Group 208.png";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";

type Props = {
  portfolio: Array<string>;
};

export const Portfolio = ({ portfolio }: Props) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const openImage = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % portfolio.length;
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? portfolio.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };
  useEffect(() => {}, [currentIndex]);
  return (
    <div className={cl.container}>
      {portfolio.length > 0 &&
        portfolio.map((item, i) => {
          const isVideo = /\.(mp4|webm|mov)(\?|#|$)/i.test(item);
          return isVideo ? (
            <div
              className={cl.img_container}
              onClick={() => openImage(i)}
              key={i}
            >
              <Image
                alt="item"
                className={cl.img}
                width={224}
                height={224}
                src={item
                  .replace("/upload/", "/upload/so_auto,w_224,h_224,c_fill/")
                  .replace(/\.(mp4|webm|mov)(\?|#|$)/, ".jpg?")}
              />
              <Image
                src={videoSrc}
                alt="video"
                width={50}
                height={50}
                className={cl.video}
              />
            </div>
          ) : (
            <div
              className={cl.img_container}
              onClick={() => openImage(i)}
              key={i}
            >
              <Image
                alt="photo"
                src={item}
                width={224}
                height={224}
                className={cl.img}
              />
            </div>
          );
        })}
      <Modal visible={visible} setVisible={setVisible}>
        {/\.(mp4|webm|mov)(\?|#|$)/i.test(portfolio[currentIndex]) ? (
          <video
            key={portfolio[currentIndex]}
            autoPlay
            controls
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          >
            <source src={portfolio[currentIndex]}></source>
          </video>
        ) : (
          <img
            src={portfolio[currentIndex]}
            alt="photo"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}
        {portfolio.length > 1 && (
          <button onClick={nextImage} className={cl.nextBtn}></button>
        )}
        {portfolio.length > 1 && (
          <button onClick={prevImage} className={cl.prevBtn}></button>
        )}
      </Modal>
    </div>
  );
};
