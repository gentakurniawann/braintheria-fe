import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen h-full w-full relative bg-white">
      <div className="w-full h-full min-h-screen backdrop-blur-sm absolute top-0 left-0"></div>
      <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6">
        {children}
      </div>
    </main>
  );
}
