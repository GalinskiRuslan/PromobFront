"use client";
import cl from "./style.module.css";
import Image from "next/image";
import src from "./assets/Group 1.png";
import Modal from "@/app/components/ui/modal/Modal";
import { useState } from "react";
import { Link } from "@/langs";

type Props = {};

export const InstructionModule = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className={cl.container}>
      <Image alt="instruction" src={src} className={cl.videoinstruction} />
      <div className={cl.navigation}>
        <button
          className={cl.nav_readTextBtn}
          onClick={() => setIsOpenModal(true)}
        >
          Прочитать текст
        </button>
        <Link href={"/registration/contacts"}>
          <button className={cl.nav_nextBtn}>Далее</button>
        </Link>
      </div>
      <Modal visible={isOpenModal} setVisible={setIsOpenModal}>
        <div className={cl.modalContainer}>
          <p className={cl.instructionTitle}>Инструкция</p>
          <p>
            <span className={cl.purpure}>
              Добро пожаловать на платформу PROmobilograf! Мы рады видеть вас в
              нашем сообществе медиа-профессионалов. PROmobilograf соединяет
              талантливых специалистов и заказчиков для успешного сотрудничества
            </span>
          </p>
          <br />
          <p>
            PROmobilograf – это платформа, где вы можете найти и предложить
            услуги в различных медиа-направлениях, таких как видеосъемка,
            монтаж, создание контента для социальных сетей и многое другое. Наша
            цель – облегчить поиск клиентов и предоставление качественных услуг
          </p>
          <br />
          <p>
            <span className={cl.purpure}>Заполните форму регистрации</span>
          </p>
          <br />
          <ul className={cl.modalList}>
            <li>Выберите ваши направления (например, "Мобилограф", "СММ")</li>
            <li> Укажите стоимость услуг</li>
            <li> Опишите свои услуги в разделе "Детали работы"</li>
            <li> Напишите кратко о себе в разделе "О себе"</li>
            <li>Укажите город, в котором вы работаете Выберите язык общения</li>
          </ul>
          <br />
          <p>
            <span className={cl.purpure}>
              Проверьте данные и завершите регистрацию
            </span>
          </p>
          <br />
          <ul className={cl.modalList}>
            <li>
              Убедитесь, что все данные верны, и нажмите кнопку для завершения
              регистрации.
            </li>
          </ul>
          <br />
          <p>
            <span className={cl.purpure}>Добавьте примеры работ</span>
          </p>
          <br />
          <ul className={cl.modalList}>
            <li>Загрузите портфолио или ссылки на ваши выполненные проекты.</li>
          </ul>
          <br />
          <p>
            <span className={cl.purpure}>
              Заполните все пункты регистрации, добавьте примеры работ, и вы
              готовы начать работу на PROmobilograf
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
};
