"use client";
import { useSelector } from "react-redux";
import { ProfileCardEditor } from "../../ui/ProfileCard/ProfileCardEditor";
import cl from "./style.module.css";
import { PortfolioUpdater } from "../../ui/PortfolioUpdater/PortfolioUpdater";

type Props = {};

export default function ProfileView({}: Props) {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return null;
  return (
    <div className={cl.container}>
      <ProfileCardEditor user={user} />
      <PortfolioUpdater
        portfolio={user.gallery ? JSON.parse(user.gallery) : []}
      />
    </div>
  );
}
