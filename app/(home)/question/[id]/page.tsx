'use client';
import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Crown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import AnswerDialog from '@/components/global/dialog/answer';

import useQuestion from '@/stores/menu/question';
import { Leaderboard } from '@/constant/dashboard';
import { useParams } from 'next/navigation';
import { useGetAnswerList, useGetDetailQuestion } from '@/hooks/menu/question';

export default function Question() {
  const { setModalAnswer } = useQuestion();
  const { id } = useParams<{ id?: string }>();
  const isValidId = !!id && typeof id === 'string';

  const queryOptions = useMemo(
    () => ({
      enabled: isValidId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }),
    [isValidId],
  );

  const { data: question } = useGetDetailQuestion(id!, queryOptions);
  const { data: answer } = useGetAnswerList(id!, queryOptions);

  useEffect(() => {
  }, [question, answer]);
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7 lg:col-start-2">
        <div className="flex flex-col gap-6 items-center">
          {/* Question Card */}
          <Card className="glass-background p-6 rounded-2xl w-full">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-300" />
                <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                  <span className="text-sm font-medium">{question?.author.name}</span>
                  <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
                  <p className="text-xs font-normal text-slate-500">
                    {question?.createdAt && !isNaN(new Date(question.createdAt).getTime())
                      ? new Date(question.createdAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </p>
                </div>
              </div>
              <Badge variant={'default'}>
                <Coins className="w-3 h-3" />
                {question?.bountyAmountWei && !isNaN(Number(question.bountyAmountWei))
                  ? (Number(question.bountyAmountWei) / 1e18).toFixed(4)
                  : '0.0000'}{' '}
                <span className="hidden lg:block">ETH</span>
              </Badge>
            </div>
            <h4 className="font-semibold mt-4">{question?.title}</h4>
            <p className="text-lg font-normal mt-1.5 mb-6">{question?.bodyMd}</p>
            <Button
              size={'lg'}
              className="max-w-40"
              variant={'outline'}
              onClick={() => setModalAnswer(true)}
            >
              <Plus />
              Add an Answer
            </Button>
          </Card>
          {/* Answer Section */}
          <Card className="glass-background p-6 rounded-2xl w-full">
            <div className="flex justify-center gap-4 items-center flex-col">
              <Image
                src={'/images/waiting-image.png'}
                alt="waiting-image"
                width={360}
                height={237}
              />
              <div className="text-center">
                <h3 className="text-2xl font-medium max-w-72">
                  {question?.author.name} is waiting for your help.
                </h3>
                <span className="text-base text-slate-500">Give answers and earn coins.</span>
              </div>
              <Button
                size={'lg'}
                className="max-w-72 w-full"
                variant={'outline'}
                onClick={() => setModalAnswer(true)}
              >
                <Plus />
                Add an Answer
              </Button>
            </div>
          </Card>
          {answer?.answers?.map((answer, index) => (
            <Card
              className="glass-background p-6 rounded-2xl w-full"
              key={index}
            >
              <div className="flex flex-row justify-between items-center">
                <h4 className="text-lg font-bold">Answer</h4>
                <Button
                  size={'sm'}
                  variant={'outline'}
                >
                  Validate
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row gap-2 items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-300" />
                <div>
                  <span className="text-sm font-medium">{answer.author.email}</span>
                  <p className="text-xs font-normal text-slate-500">
                    {' '}
                    {answer?.createdAt && !isNaN(new Date(answer.createdAt).getTime())
                      ? new Date(answer.createdAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </p>
                </div>
              </div>
              <p className="text-lg font-normal">{answer?.bodyMd}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <Card className="glass-background p-6 rounded-2xl w-full">
          <div className="flex gap-2 items-center">
            <Crown className="h-6 w-6" />
            <h4 className="text-lg font-bold">Leaderboard</h4>
          </div>
          <Separator className="my-4" />
          <ul>
            {Leaderboard.map((user, index) => (
              <li
                key={index}
                className="text-sm py-1 px-2"
              >
                {user.username}
                <span className="float-right font-medium">
                  {user.tokens}
                  <Coins className="inline-block w-3 h-3 ml-2" />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <AnswerDialog
        question={question?.bodyMd || ''}
        questionId={Number(question?.id)}
      />
    </div>
  );
}
