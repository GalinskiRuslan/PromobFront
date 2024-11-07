"use client";
import ProfilePictureUploader from "@/app/components/ui/InputPhoto/ProfilePictureUploader";
import cl from "./style.module.css";
import MultiImageUploader from "@/app/components/ui/MultiplePhotoLoader/MultiplePhotoLoader";
import { useRouter } from "@/langs";
type Props = {};

export const Portfolio = (props: Props) => {
  const router = useRouter();
  return (
    <div className={cl.container}>
      <p className={cl.title}>Оформление профиля</p>
      <p className={cl.text}>
        Загрузите вашу аватарку. Затем загрузите фото, видео которые посетители
        увидят первым делом, когда попадет на вашу страницу.
      </p>
      <ProfilePictureUploader />
      <MultiImageUploader />
      <div className={cl.navBtns}>
        <button className={cl.btnBack} onClick={() => router.back()}>
          Назад
        </button>
        <button className={cl.nextBtn} onClick={() => router.push("/tarif")}>
          Далее
        </button>
      </div>
    </div>
  );
};
