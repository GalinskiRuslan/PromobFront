"use client";
import cl from "./style.module.css";
import { getAllCategories } from "@/app/store/slices/categories";
import { AppDispatch } from "@/app/store/store";
import { Link } from "@/langs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export const CategoryList = (props: Props) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: any) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div className={cl.container}>
      <ul className={cl.list}>
        {categories?.map((category: any) => (
          <Link
            href={`?category=${category.alias}`}
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
