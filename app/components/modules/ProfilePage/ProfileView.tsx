"use client";
import { useSelector } from "react-redux";
import { ProfileCardEditor } from "../../ui/ProfileCard/ProfileCardEditor";
import cl from "./style.module.css";

type Props = {};

export default function ProfileView({}: Props) {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className={cl.container}>
      <ProfileCardEditor user={user} />
    </div>
  );
}
