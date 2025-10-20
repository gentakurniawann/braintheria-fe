"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, UserCircle2 } from "lucide-react";

import useAuth from "@/stores/auth";
import useTheme from "@/stores/theme";

import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const { token } = useAuth();
  const { setModalQuestion } = useTheme();
  const isMobile = useIsMobile();

  return (
    <nav className="w-full h-20 flex flex-row items-center justify-between px-6 lg:px-12 z-10 relative">
      <Link href={"/"}>
        <Image
          src="/images/Braintheria-logo.png"
          alt="braintheria-logo"
          width={155}
          height={24}
        />
      </Link>
      {token && (
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Search Your Question..."
            className="w-full lg:w-96 h-10 glass-background text-blue-950"
            icon={Search}
          />
          {!isMobile && (
            <Button
              className=""
              size={"lg"}
              onClick={() => setModalQuestion(true)}
            >
              Ask A Question
            </Button>
          )}
        </div>
      )}
      {token ? (
        <UserCircle2 className="w-8 h-8 text-blue-950" />
      ) : (
        <div>
          <ul>
            <li>
              <Link href="/auth/login">Sign In</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
