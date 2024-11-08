"use client";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import cl from "./style.module.css";
import {
  getAllCategories,
  getCategoriesWithCity,
} from "@/app/store/slices/categories";
import { AppDispatch } from "@/app/store/store";
import { Link, usePathname } from "@/langs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export const CategoryList = (props: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: any) => state.categories);
  const getAllCategoriesLoc = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(getAllCategories()).unwrap();
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };

  const getCategoriesWithCityLocal = async (id: number) => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        getCategoriesWithCity({ city: id })
      ).unwrap();
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  useEffect(() => {
    if (pathName.includes("city")) {
      getCategoriesWithCityLocal(Number(pathName.split("/city/")[1]));
    } else {
      getAllCategoriesLoc();
    }
  }, [pathName]);
  return (
    <div className={cl.container}>
      <ul className={cl.list}>
        {categories?.map((category: any) => (
          <Link
            key={category.id}
            href={`?category=${category.id}`}
            className={
              searchParams.get("category") === category.alias
                ? cl.listLinkActive
                : cl.listLink
            }
          >
            <li key={category.id} className={cl.categoryItem}>
              <span>{category.category}</span>
              <span>{category.users_count}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
