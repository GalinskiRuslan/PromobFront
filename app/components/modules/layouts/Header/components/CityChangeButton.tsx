"use client";
import { getAllCities } from "@/app/store/slices/citySlice";
import { AppDispatch } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import locationSrc from "../assets/map pin.png";
import cl from "../style.module.css";
import Modal from "@/app/components/ui/modal/Modal";
import { Link, usePathname } from "@/langs";

interface City {
  id: number;
  city: string;
  alias: string;
  title_seo: string;
  description_seo: string;
  keywords_seo: string;
  created_at: string;
  updated_at: string;
}

export const CityChangeButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [cities, setCities] = useState<City[]>();
  const [filteredCities, setFilteredCities] = useState<City[]>();
  const [visible, setVisible] = useState(false);
  const pathName = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getAllCity();
  }, []);
  const getAllCity = async () => {
    try {
      const data = await dispatch<any>(getAllCities()).unwrap();
      setCities(data);
      setFilteredCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCities(
      cities?.filter((city: any) => city.city.toLowerCase().includes(query))
    );
  };
  return (
    <>
      <button className={cl.buttonLocation} onClick={() => setVisible(true)}>
        <Image src={locationSrc} alt="location" />
        <span>
          {pathName.includes("/city")
            ? cities?.find(
                (city: any) => city.id == pathName.split("/city/")[1]
              )?.city
            : "Выберете город"}
        </span>
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <p className={cl.title}>
          {pathName.includes("/city")
            ? cities?.find(
                (city: any) => city.id == pathName.split("/city/")[1]
              )?.city
            : "Выберете город"}
        </p>
        <p className={cl.subtitle}>
          Выбор города поможет вам выбрать нужного специалиста
        </p>
        <input
          type="text"
          placeholder="Поиск города..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={cl.searchInput}
        />
        {filteredCities && (
          <div className={cl.cityContainer}>
            <ul className={cl.citiesList}>
              {filteredCities.map((city: any) => (
                <Link
                  className={
                    pathName.includes(city.id) ? cl.activeLink : cl.link
                  }
                  href={`/city/${city.id}`}
                  key={city.id}
                >
                  <li onClick={() => setVisible(false)}>{city.city} </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
};
