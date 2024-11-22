import { CategoryList } from "../components/modules/CategoryList/CategoryList";
import { ExecutorList } from "../components/modules/ExecutorsList/ExecutorList";
import { TopBanner } from "../components/modules/TopBanner/TopBanner";
import cl from "./style.module.css";
export default function Home() {
  return (
    <div>
      <TopBanner />

      <div className={cl.content}>
        <p className={cl.title}>Специалисты </p>
        <div className={cl.categories}>
          <p className={cl.catTitle}>Кого вы ищете :</p>
          <CategoryList />
        </div>
        <div className={cl.users}>
          <ExecutorList />
        </div>
      </div>
    </div>
  );
}
