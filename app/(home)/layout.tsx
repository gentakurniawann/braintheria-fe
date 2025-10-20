"use client";
import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <div className="absolute w-full h-full overflow-hidden">
        <div
          className={`rounded-full w-[29.5vw] h-[29.5vw] min-w-[213px] min-h-[213px] max-w-[426px] max-h-[426px] blur-[150px] bg-blue-300 absolute top-[48px] ${
            pathname === "/" ? "left-[-265px]" : "right-[-265px]"
          } gradient-animation`}
        />
        <div
          className={`rounded-full w-[29.5vw] h-[29.5vw] min-w-[213px] min-h-[213px] max-w-[426px] max-h-[426px] blur-[150px] bg-blue-400 absolute top-[-188px] ${
            pathname === "/" ? "left-[161px]" : "right-[161px]"
          } gradient-animation`}
        />
        <div
          className={`rounded-full w-[29.5vw] h-[29.5vw] min-w-[213px] min-h-[213px] max-w-[426px] max-h-[426px] blur-[150px] bg-blue-500 absolute top-[-188px] ${
            pathname === "/" ? "left-[-124px]" : "right-[-124px]"
          } gradient-animation`}
        />
      </div>
      <Navbar />
      <main className="min-h-screen p-2 sm:p-6 lg:p-12 relative z-10 !text-blue-950">
        {children}
      </main>
    </>
  );
}
