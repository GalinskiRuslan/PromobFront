import { usePathname, useRouter } from "@/langs";
import { useLocale } from "next-intl";
import cl from "../style.module.css";

export const LangChanger = () => {
  const path = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (value: "ru" | "en" | "kz") => {
    router.push(path, { locale: value });
  };
  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value as "ru" | "en" | "kz")}
      className={cl.langBtn}
    >
      <option value="ru">ru</option>
      <option value="en">en</option>
      <option value="kz">kz</option>
    </select>
  );
};
