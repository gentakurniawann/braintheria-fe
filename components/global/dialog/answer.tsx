import React, { useMemo } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import useQuestion from '@/stores/menu/question';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';
import { useGetDetailQuestion } from '@/hooks/menu/question';

export default function AnswerDialog() {
  const { modalAnswer, setModalAnswer } = useQuestion();
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
  return (
    <Dialog
      open={modalAnswer}
      onOpenChange={setModalAnswer}
    >
      <DialogContent className="!max-w-5xl">
        <DialogHeader>
          <DialogTitle>You Answer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-stretch">
            <div className="col-span-4">
              <h4 className="text-lg font-medium">Question</h4>
              <p className="text-lg font-normal">{question?.bodyMd}</p>
            </div>
            <div className="col-span-8 ">
              <Textarea
                placeholder="Write your answer here"
                className="h-full"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="default"
              size={'lg'}
            >
              Add your Answer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
