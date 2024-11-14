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
} from "@/app/store/slices/usersSlice";
import { AppDispatch } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Executor from "../ExecutorCard/Executor";
import cl from "./style.module.css";
import { useSearchParams } from "next/dist/client/components/navigation";
import { PaginationPages } from "../../ui/PaginationPages/PaginationPages";

type Props = {};

export const ExecutorList = (props: Props) => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const getUsers = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(
        getAllUsers({ perPage: 20, page: currentPage })
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
  const getUsersWithCity = async () => {};
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
    if (searchParams.get("category")) {
      getUsersWithCategory();
      setCurrentPage(1);
    } else {
      getUsers();
    }
  }, [searchParams]);
  useEffect(() => {
    if (searchParams.get("category")) {
      getUsersWithCategory();
    } else {
      getUsers();
    }
  }, [currentPage]);
  if (users?.length < 1)
    return <p className={cl.dangertext}>Увы, пока нет похожиш специалистов.</p>;
  return (
    <div className={cl.container}>
      {users.map((user: any) => (
        <Executor user={user} key={user.id} />
      ))}
      <PaginationPages
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
