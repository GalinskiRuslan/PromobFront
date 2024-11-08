import { IUser } from "@/app/types";
import cl from "./style.module.css";
import Image from "next/image";
import mapPin from "./assets/map pin.png";
import { useSelector } from "react-redux";
type Props = {
  user: IUser;
};

const Executor = ({ user }: Props) => {
  const { cities } = useSelector((state: any) => state.city);
  return (
    <div className={cl.executor}>
      <div className={cl.headContent}>
        <Image
          alt="photo"
          src={user.photos}
          width={150}
          height={150}
          className={cl.img}
        />
        <div className={cl.secondTop}>
          {user.nickname_true ? (
            <p className={cl.nick}>
              {user.nickname} ({user.name})
            </p>
          ) : (
            <p className={cl.nick}>
              {user.name} {user.surname_2}
            </p>
          )}
          <div className={cl.mapCont}>
            <Image alt="map" src={mapPin} />
            <p className={cl.city}>
              {cities?.find((city: any) => city.id == user.cities_id)?.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executor;
