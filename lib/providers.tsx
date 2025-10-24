'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TanstackQueryProvider from '@/lib/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Loader2 } from 'lucide-react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

const ModalSuccess = dynamic(() => import('@/components/global/modal-success'), { ssr: false });
const ModalDelete = dynamic(() => import('@/components/global/modal-delete'), { ssr: false });

import useTheme from '@/stores/theme';
import useAuth from '@/stores/auth';

import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});

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
    <WagmiProvider config={config}>
      <TanstackQueryProvider>
        <NuqsAdapter>
          <RainbowKitProvider>
            <ModalSuccess />
            <ModalDelete />
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="w-full min-h-full flex items-center justify-center bg-gray-500/60 z-50 absolute">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              )}
              {children}
            </div>
          </RainbowKitProvider>
        </NuqsAdapter>
      </TanstackQueryProvider>
    </WagmiProvider>
  );
}
