'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import useAuth from '@/stores/auth';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setToken, setUserCredential } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      handleTokenCallback(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTokenCallback = async (token: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // store token in zustand and cookies
      setToken(token);
      // fetch user data
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserCredential(userData);

      // redirect
      router.push('/');
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      // clear on error
      Cookies.remove('token');
      Cookies.remove('user');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/google`;
  };

  // Show processing state when handling token
  if (isProcessing) {
    return (
      <div className="h-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-300 dark:from-sky-900 dark:via-indigo-900 dark:to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/10 dark:bg-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-sm bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8 z-10"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white text-2xl font-bold shadow-lg mb-4">
              🧠
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <h1 className="text-xl font-bold text-blue-800 dark:text-sky-100 mb-2">
              Signing you in...
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              Please wait while we complete your authentication
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-300 dark:from-sky-900 dark:via-indigo-900 dark:to-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/10 dark:bg-black/20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative w-full max-w-sm bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8 z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white text-2xl font-bold shadow-lg mb-3">
            🧠
          </div>
          <h1 className="text-2xl font-bold text-blue-800 dark:text-sky-100">Welcome Back 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Sign in with your Google account
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
          >
            <p className="text-sm text-red-800 dark:text-red-300 text-center">{error}</p>
          </motion.div>
        )}

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full flex items-center justify-center gap-3 py-3 bg-white/80 dark:bg-sky-950/50 border border-blue-300 dark:border-sky-700 hover:bg-blue-100 dark:hover:bg-sky-900 transition"
        >
          <span className="font-medium text-blue-800 dark:text-sky-200">Continue with Google</span>
        </Button>

        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{' '}
          <a
            href="/terms"
            className="underline text-blue-700 dark:text-sky-300 hover:text-blue-800"
          >
            Terms of Service
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
