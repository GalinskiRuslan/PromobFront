"use client";
import React, { useEffect, useState } from "react";
import cl from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getAllCategories } from "@/app/store/slices/categories";
import { useRouter } from "@/langs";
import { updateInfoUser } from "@/app/store/slices/userSlice";
import {
  serErrorMethod,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";

type Props = {};

export const InfoAboutUser = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: any) => state.categories);
  const { cities } = useSelector((state: any) => state.city);
  const [changeCategories, setChangeCategories] = useState<any>([]);
  const router = useRouter();
  const [costFrom, setCostFrom] = useState("");
  const [costUp, setCostUp] = useState("");
  const [details, setDetails] = useState("");
  const [aboutYourself, setAboutYourself] = useState("");
  const [rusLang, setRusLang] = useState(false);
  const [kazLang, setKazLang] = useState(false);
  const [engLang, setEngLang] = useState(false);
  const [city, setCity] = useState(0);
  const onChangeCategory = (id: number) => {
    if (changeCategories.includes(id)) {
      setChangeCategories(changeCategories.filter((item: any) => item !== id));
    } else if (changeCategories.length < 3) {
      setChangeCategories([...changeCategories, id]);
    } else {
      return;
    }
  };
  const isDisabled = () => {
    if (
      Number(costFrom) > 10 &&
      Number(costUp) > 10 &&
      changeCategories.length > 0 &&
      details.length > 22 &&
      aboutYourself.length > 22
    ) {
      return false;
    } else {
      return true;
    }
  };
  const saveInfo = () => {
    dispatch(setVisibleLoader(true));
    try {
      dispatch(
        updateInfoUser({
          cost_from: Number(costFrom),
          cost_up: Number(costUp),
          categories_id: changeCategories,
          details,
          about_yourself: aboutYourself,
          cities_id: city,
          language: [
            rusLang ? "rus" : null,
            kazLang ? "kaz" : null,
            engLang ? "eng" : null,
          ],
        })
      ).unwrap();
      dispatch(setVisibleLoader(false));
      router.push("/registration/profile");
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
    }
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div className={cl.container}>
      <p className={cl.title}>Информация о вас</p>
      <p className={cl.subtitle}>Укажите свое направление</p>
      <div className={cl.categoryList}>
        {categories?.map((category: any) => (
          <button
            onClick={() => onChangeCategory(category.id)}
            className={
              changeCategories.includes(category.id)
                ? cl.activeCategory
                : cl.category
            }
          >
            {category.category}
          </button>
        ))}
      </div>
      <div className={cl.form_item}>
        <p className={cl.text}>Укажите стоимость своих услуг</p>
        <div className={cl.inputs}>
          <input
            type="text"
            placeholder="От"
            className={cl.input}
            value={costFrom}
            onChange={(e) => setCostFrom(e.target.value.replace(/\D/g, ""))}
          />
          <input
            type="text"
            placeholder="До"
            className={cl.input}
            value={costUp}
            onChange={(e) => setCostUp(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
      <div className={cl.form_item}>
        <p className={cl.text}>Детали работы (не менее 22 символов)</p>
        <input
          type="text"
          placeholder="Детали работ"
          className={cl.input}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div className={cl.form_item}>
        <p className={cl.text}>О себе (не менее 22 символов)</p>
        <input
          type="text"
          placeholder="О себе"
          className={cl.input}
          value={aboutYourself}
          onChange={(e) => setAboutYourself(e.target.value)}
        />
      </div>
      <div className={cl.form_item}>
        <div className={cl.inputs}>
          <div className={cl.input_city}>
            <p className={cl.text}>Выберите город</p>
            <select
              className={cl.citiesSelect}
              value={city}
              onChange={(e) => setCity(Number(e.target.value))}
            >
              <option value="0" disabled>
                Выберите город
              </option>
              {cities?.map((city: any) => (
                <option key={city.id} value={city.id}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
          <div className={cl.input_city}>
            <p className={cl.text}>Язык</p>
            <div className={cl.lunge}>
              <input
                type="checkbox"
                className={cl.checkbox}
                value={"rus"}
                checked={rusLang}
                onChange={() => setRusLang(!rusLang)}
              />
              <p>Русский</p>
            </div>
            <div className={cl.lunge}>
              <input
                type="checkbox"
                className={cl.checkbox}
                value={"kaz"}
                checked={kazLang}
                onChange={() => setKazLang(!kazLang)}
              />
              <p>Казахский</p>
            </div>
            <div className={cl.lunge}>
              <input
                type="checkbox"
                className={cl.checkbox}
                value={"eng"}
                checked={engLang}
                onChange={() => setEngLang(!engLang)}
              />
              <p>Английский</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cl.navBtns}>
        <button className={cl.btnBack} onClick={() => router.back()}>
          Назад
        </button>
        <button
          className={cl.nextBtn}
          disabled={isDisabled()}
          onClick={saveInfo}
        >
          Далее
        </button>
      </div>
    </div>
  );
};
