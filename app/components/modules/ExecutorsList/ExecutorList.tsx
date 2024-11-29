"use client";
import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
  setIsOpenModal,
  setVisibleLoader,
} from "@/app/store/slices/appSlice";
import {
  getAllUsers,
  getAllUsersWihtCategory,
  getUsersWithCity,
  getUsersWithCityAndCategory,
} from "@/app/store/slices/usersSlice";
import { AppDispatch } from "@/app/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Executor from "../ExecutorCard/Executor";
import cl from "./style.module.css";
import { useSearchParams } from "next/dist/client/components/navigation";
import { PaginationPages } from "../../ui/PaginationPages/PaginationPages";
import { usePathname } from "@/langs";

type Props = {};

export const ExecutorList = (props: Props) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const [users, setUsers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const refAnchor = useRef<HTMLSpanElement | null>(null);
  const { filters } = useSelector((state: any) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const getUsers = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        getAllUsers({
          perPage: 20,
          page: currentPage,
          isRatingOrder: filters.isRatingOrder,
        })
      ).unwrap();
      setUsers(response.data);
      setTotalPages(response.meta.total_pages);
      dispatch(setVisibleLoader(false));
      return response.data;
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };

  const getUsersWithCityL = async () => {
    dispatch(setVisibleLoader(true));
    try {
      if (searchParams.get("category")) {
        const response = await dispatch(
          getUsersWithCityAndCategory({
            category_id: Number(searchParams.get("category")),
            city_id: Number(path.split("/")[2]),
            perPage: 20,
            page: currentPage,
          })
        ).unwrap();
        setUsers(response.data);
        setTotalPages(response.meta.total_pages);
      } else {
        const response = await dispatch(
          getUsersWithCity({
            city_id: Number(path.split("/")[2]),
            perPage: 20,
            page: currentPage,
          })
        ).unwrap();
        setUsers(response.data);
        setTotalPages(response.meta.total_pages);
      }
      dispatch(setVisibleLoader(false));
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  const getUsersWithCategory = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        getAllUsersWihtCategory({
          category_id: Number(searchParams.get("category")),
          perPage: 20,
          page: currentPage,
        })
      ).unwrap();
      setUsers(response.data);
      setTotalPages(response.meta.total_pages);
      dispatch(setVisibleLoader(false));
      return response.data;
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setIsOpenModal(true));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  useEffect(() => {
    if (path.includes("city")) {
      getUsersWithCityL();
    } else if (searchParams.get("category")) {
      setCurrentPage(1);
      getUsersWithCategory();
    } else {
      getUsers();
    }
  }, [searchParams, filters]);
  useEffect(() => {
    if (path.includes("city")) {
      getUsersWithCityL();
    } else if (searchParams.get("category")) {
      getUsersWithCategory();
    } else {
      getUsers();
    }
  }, [currentPage, filters]);
  useEffect(() => {
    if (refAnchor.current) {
      refAnchor.current.scrollIntoView({ behavior: "smooth" });
      refAnchor.current.focus();
    }
  }, [currentPage]);
  if (users?.length < 1)
    return <p className={cl.dangertext}>Увы, пока нет похожиш специалистов.</p>;
  return (
    <div className={cl.container}>
      <span ref={refAnchor}></span>
      {filters.iisRatingOrder
        ? users.sort(() => Math.random() - 0.5)
        : users.map((user: any) => <Executor user={user} key={user.id} />)}
      <PaginationPages
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
