'use client';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useBalance } from 'wagmi';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import useTheme from '@/stores/theme';
import { CustomField } from '@/components/ui/form-field';
import { Text as TextInput } from '@/components/ui/text';
import { useCreateQuestion } from '@/hooks/menu/question';
import { IQuestionPayload } from '@/types/menu/question';

export const makeQuestionFormSchema = (userBalance: number) =>
  z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    bodyMd: z.string().min(10, 'Question must be at least 10 characters'),
    bounty: z
      .string()
      .nonempty('Please insert bounty')
      .refine((val) => /^[0-9]*\.?[0-9]+$/.test(val), {
        message: 'Bounty must be a valid number',
      })
      .refine((val) => parseFloat(val) <= userBalance, {
        message: `Bounty cannot exceed your wallet balance (${userBalance} ETH)`,
      }),
  });

export default function QuestionDialog() {
  const { modalQuestion, setModalQuestion } = useTheme();
  const { address } = useAccount();
  const { data: userBalance } = useBalance({
    address: address,
  });

  const questionFormSchema = makeQuestionFormSchema(Number(userBalance?.decimals) || 0);
  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: '',
      bodyMd: '',
      bounty: '',
    },
  });

  const { mutate: createQuestion } = useCreateQuestion();

  const onSubmit = async (data: z.infer<typeof questionFormSchema>) => {
    await createQuestion(data as IQuestionPayload);
    setModalQuestion(false);
    form.reset();
  };

  useEffect(() => {}, [modalQuestion]);

  return (
    <Dialog
      open={modalQuestion}
      onOpenChange={setModalQuestion}
    >
      <DialogContent className="!max-w-3xl">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <CustomField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Write title here"
                    {...field}
                  />
                )}
              />
              <CustomField
                name="bodyMd"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Write your question here"
                    {...field}
                  />
                )}
              />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <CustomField
                    name={'bounty'}
                    control={form.control}
                    render={({ field }) => (
                      <TextInput
                        placeholder="Write Bounty eg. 0.1"
                        {...field}
                      />
                    )}
                  />
                  <div>
                    <Coins className="inline-block mr-1 w-6 h-6 text-primary" />
                    <span className="text-xs text-primary font-normal">
                      you have{' '}
                      {userBalance?.formatted ? parseFloat(userBalance.formatted).toFixed(4) : 0} coins
                      now
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size={'lg'}
                >
                  Submit Question
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
