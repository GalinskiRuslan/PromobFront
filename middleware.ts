import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./langs";

export default createMiddleware({
  defaultLocale: "ru",
  localePrefix,
  locales,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
