import { CategoryList } from "../components/modules/CategoryList/CategoryList";
import { ExecutorList } from "../components/modules/ExecutorsList/ExecutorList";
import { TopBanner } from "../components/modules/TopBanner/TopBanner";
import cl from "./style.module.css";
export default function Home() {
  return (
    <div>
      <TopBanner />
      {/* <p>Специалисты: </p> */}
      <div className={cl.content}>
        <div className={cl.categories}>
          <CategoryList />
        </div>
        <div className={cl.users}>
          <ExecutorList />
        </div>
      </div>
    </div>
  );
}
