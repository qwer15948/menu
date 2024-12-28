"use client"; // 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";
import { Jua } from "next/font/google";
import "./globals.css";

const juaFont = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("autumn"); // 기본 테마

  useEffect(() => {
    // 사용자 OS의 다크 모드 설정 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 다크 모드 변경 시 처리
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dracula" : "autumn");
    };

    // 초기 모드 설정
    setTheme(mediaQuery.matches ? "dracula" : "autumn");

    // 이벤트 리스너 추가
    mediaQuery.addEventListener("change", handleChange);

    // 클린업
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <html lang="ko" data-theme={theme}>
      <body className={`${juaFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
