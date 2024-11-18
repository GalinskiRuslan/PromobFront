import { CategoryList } from "@/app/components/modules/CategoryList/CategoryList";
import { ExecutorList } from "@/app/components/modules/ExecutorsList/ExecutorList";
import { TopBanner } from "@/app/components/modules/TopBanner/TopBanner";
import cl from "../../style.module.css";

export default function City({ params }: any) {
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
