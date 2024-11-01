import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { ProvidersRedux } from "../store/ReduxProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Header } from "../components/modules/layouts/Header/Header";
import cl from "./style.module.css";

export const metadata: Metadata = {
  title: "Promobilograf",
  description: "Платформа №1 для медиа-профессионалов в Казахстане",
};

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "900", "300"],
  variable: "--font-nunito",
});
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang="en">
      <ProvidersRedux>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body suppressHydrationWarning={true} className={nunito.className}>
            <ThemeProvider>
              <div className={cl.container}>
                <Header />
                {children}
              </div>
            </ThemeProvider>
          </body>
        </NextIntlClientProvider>
      </ProvidersRedux>
    </html>
  );
}
