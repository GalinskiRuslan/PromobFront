"use client";

import {
  serErrorMethod,
  setErrorCode,
  setErrorText,
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

type Props = {};

export const ExecutorList = (props: Props) => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const getUsers = async () => {
    dispatch(setVisibleLoader(true));
    try {
      const response = await dispatch(getAllUsers()).unwrap();
      setUsers(response.users);
      dispatch(setVisibleLoader(false));
      return response.data;
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
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
        })
      ).unwrap();
      setUsers(response.data);
      dispatch(setVisibleLoader(false));
      return response.data;
    } catch (error: any) {
      dispatch(setVisibleLoader(false));
      dispatch(setErrorText(error.errorText));
      dispatch(serErrorMethod(error.method));
      dispatch(setErrorCode(error.status));
    }
  };
  useEffect(() => {
    if (searchParams.get("category")) {
      getUsersWithCategory();
    } else {
      getUsers();
    }
  }, [searchParams]);
  if (users.length < 1)
    return <p className={cl.dangertext}>Увы, пока нет похожиш специалистов.</p>;
  return (
    <div className={cl.container}>
      {users.map((user: any) => (
        <Executor user={user} key={user.id} />
      ))}
    </div>
  );
};
