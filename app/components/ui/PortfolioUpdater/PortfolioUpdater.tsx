"use client";
import { useState } from "react";
import Modal from "../modal/Modal";
import cl from "./style.module.css";
import Image from "next/image";
import MultiImageUploader from "../MultiplePhotoLoader/MultiplePhotoLoader";
import { ContactsAdd } from "../../modules/RegistrationPage/Contacts/ContactsAdd";
import { InfoAboutUser } from "../../modules/RegistrationPage/Info/InfoAboutUser";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import { deletePortfolioPhoto } from "@/app/store/slices/userSlice";

type Props = {
  portfolio: Array<string>;
};

export const PortfolioUpdater = ({ portfolio }: Props) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState("");
  const [deleteProductType, setDeleteProductType] = useState("img");
  const dispatch = useDispatch<AppDispatch>();
  const onDeleteBtn = (item: string, type?: string) => {
    setDeleteVisible(true);
    setDeleteProductType(type ? type : "img");
    setDeleteProduct(item);
  };
  const deletePortfolioItem = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        deletePortfolioPhoto(deleteProduct)
      ).unwrap();
      setDeleteVisible(false);
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      setDeleteVisible(false);
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  return (
    <>
      <p className={cl.title}>Портфолио</p>
      <div className={cl.container}>
        {portfolio.length > 0
          ? portfolio.map((item, index) => {
              const isVideo = /\.(mp4|webm|mov)(\?|#|$)/i.test(item);
              return isVideo ? (
                <div className={cl.itemCont} key={index}>
                  <button
                    className={cl.deleteBtn}
                    onClick={() => onDeleteBtn(item, "video")}
                  >
                    <svg
                      width="26"
                      height="24"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.6458 6L6.94922 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.94922 6L19.6458 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <Image
                    alt="item"
                    className={cl.img}
                    width={224}
                    height={224}
                    key={index}
                    src={item
                      .replace(
                        "/upload/",
                        "/upload/so_auto,w_224,h_224,c_fill/"
                      )
                      .replace(/\.(mp4|webm|mov)(\?|#|$)/, ".jpg?")}
                  />
                </div>
              ) : (
                <div className={cl.itemCont} key={index}>
                  <button
                    className={cl.deleteBtn}
                    onClick={() => onDeleteBtn(item, "img")}
                  >
                    <svg
                      width="26"
                      height="24"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.6458 6L6.94922 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.94922 6L19.6458 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <Image
                    width={224}
                    height={224}
                    alt="item"
                    src={item}
                    key={index}
                    className={cl.img}
                  />
                </div>
              );
            })
          : null}
      </div>
      <MultiImageUploader />
      <div className={cl.container}>
        <p className={cl.title}>Изменения данных профиля</p>
        <ContactsAdd isStep={false} />
        <InfoAboutUser isRegister={false} />
      </div>
      <Modal visible={deleteVisible} setVisible={setDeleteVisible}>
        <p className={cl.title}>Вы уверены, что хотите удалить ?</p>
        {deleteProductType === "img" ? (
          <Image
            alt="lol"
            src={deleteProduct}
            width={320}
            height={320}
            className={cl.img}
          />
        ) : (
          <video controls width={"100%"} className={cl.video}>
            <source src={deleteProduct}></source>
          </video>
        )}
        <div className={cl.btns}>
          <button className={cl.deleteBtnInner} onClick={deletePortfolioItem}>
            Да
          </button>
          <button
            className={cl.cancelBtn}
            onClick={() => {
              setDeleteVisible(false);
              setDeleteProduct("");
              setDeleteProductType("img");
            }}
          >
            Нет
          </button>
        </div>
      </Modal>
    </>
  );
};
