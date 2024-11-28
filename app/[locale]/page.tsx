import { CategoryList } from "../components/modules/CategoryList/CategoryList";
import { ExecutorList } from "../components/modules/ExecutorsList/ExecutorList";
import { Filters } from "../components/modules/Filters/Filters";
import { CityChangeButton } from "../components/modules/layouts/Header/components/CityChangeButton";
import { TopBanner } from "../components/modules/TopBanner/TopBanner";
import cl from "./style.module.css";
export default function Home() {
  return (
    <div>
      <TopBanner />

      <div className={cl.content}>
        <div className={cl.categories}>
          <p className={cl.catTitle}>Кого вы ищете :</p>
          <CategoryList />
        </div>
        <div className={cl.cityChange}>
          <p className={cl.cityTitle}>Город:</p>
          <CityChangeButton />
        </div>
        <Filters />
        <div className={cl.users}>
          <p className={cl.title}>Специалисты </p>
          <ExecutorList />
        </div>
      </div>
    </div>
  );
}
