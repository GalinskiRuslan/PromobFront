import { UserInfo } from "@/app/components/modules/UserInfo/UserInfo";

export default function User({ params }: any) {
  return <UserInfo user_id={params.id} />;
}
