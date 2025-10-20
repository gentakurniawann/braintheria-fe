"use client";
import TanstackQueryProvider from "@/lib/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Loader2 } from "lucide-react";

import useTheme from "@/stores/theme";
import useAuth from "@/stores/auth";
import { useEffect } from "react";

export default function RootProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // variables
  const { isLoading } = useTheme();
  const { getToken } = useAuth();

  // lifecycle
  useEffect(() => {
    getToken();
  }, [getToken]);
  return (
    <TanstackQueryProvider>
      <NuqsAdapter>
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="w-full min-h-full flex items-center justify-center bg-gray-500/60 z-50 absolute">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          {children}
        </div>
      </NuqsAdapter>
    </TanstackQueryProvider>
  );
}
