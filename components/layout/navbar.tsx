'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { Search, UserCircle2 } from 'lucide-react';

import useAuth from '@/stores/auth';
import useTheme from '@/stores/theme';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Navbar() {
  const { token, logout } = useAuth();
  const { setModalQuestion } = useTheme();
  const isMobile = useIsMobile();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="w-full h-20 flex flex-row items-center justify-between px-6 lg:px-12 z-10 relative">
      <Link href={'/'}>
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {!isMobile && (
            <Button
              className=""
              size={'lg'}
              onClick={() => setModalQuestion(true)}
            >
              Ask A Question
            </Button>
          )}
        </div>
      )}
      {token ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserCircle2 className="w-8 h-8 text-blue-950 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                router.push('/profile');
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Wallet</DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem
              onClick={logout}
              className="!text-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <ul>
            <li>
              <Link href="/auth/sign-in">Sign In</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
