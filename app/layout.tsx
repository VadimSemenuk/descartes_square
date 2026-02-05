import type { Metadata } from "next";
import {Manrope} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic"],
});

const title = "Метод квадратов Декарта онлайн — принять решение осознанно";
const description =
  "Онлайн-инструмент метода квадратов Декарта для принятия решений. Взвесьте последствия, риски и упущенные возможности за 4 шага";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "метод квадратов декарта",
    "квадраты декарта",
    "принятие решений",
    "как принять решение",
    "анализ решений",
    "инструмент принятия решений",
    "онлайн метод декарта"
  ],
  openGraph: {
    type: "website",
    title,
    description,
    emails: ["pragmatsoft@gmail.com"],
    phoneNumbers: ["%2B375445931003"],
    siteName: "Logo Adult",
    images: "https://square.pragmatsoft.com/main.svg",
    url: "https://square.pragmatsoft.com",
  },
  alternates: {
    canonical: "https://square.pragmatsoft.com",
  },
  other: {
    "yandex-verification": "0fd23194457bcc1e",
    // "zen-verification": "tvWRACgORsdtwK14mtRp9I6k57G3XRCjS47E2WwfVTzIqzuEizp9Tab0HVh6ehBI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
