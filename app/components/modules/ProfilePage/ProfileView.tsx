"use client";
import { useSelector } from "react-redux";
import { ProfileCardEditor } from "../../ui/ProfileCard/ProfileCardEditor";
import cl from "./style.module.css";
import { PortfolioUpdater } from "../../ui/PortfolioUpdater/PortfolioUpdater";
import { ClientProfileEditor } from "../ClientProfile/ClientProfileEditor";
import { IUser } from "@/app/types";

type Props = {};

export default function ProfileView({}: Props) {
  const { user }: { user: IUser } = useSelector((state: any) => state.auth);

  if (!user) return null;
  else if (user?.role === "executor") {
    return (
      <div className={cl.container}>
        <ProfileCardEditor user={user} />
        {user?.isActive?.is_active ? (
          <PortfolioUpdater
            portfolio={user.gallery ? JSON.parse(user.gallery) : []}
          />
        ) : (
          <p className={cl.haventSub}>
            Вы не можете редактировать профиль, пока не продлите подписку 😓
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className={cl.container}>
        <ClientProfileEditor user={user} />
      </div>
    );
  }
}
