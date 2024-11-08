import { CategoryList } from "@/app/components/modules/CategoryList/CategoryList";

export default function City({ params }: any) {
  return (
    <div>
      City {params.id}
      <CategoryList />
    </div>
  );
}
