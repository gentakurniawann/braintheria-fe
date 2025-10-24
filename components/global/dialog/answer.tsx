import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { CustomField } from '@/components/ui/form-field';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import useTheme from '@/stores/theme';
import useQuestion from '@/stores/menu/question';
import { useCreateAnswer } from '@/hooks/menu/question';

interface IAnswerDialogProps {
  question: string;
  questionId: number;
}

export const answerFormSchema = () => {
  return z.object({
    bodyMd: z
      .string()
      .min(10, 'Answer should have at least 10 characters and maximum 5000 characters')
      .max(5000, 'Answer should have at least 10 characters and maximum 5000 characters')
      .nonempty(),
  });
};

export default function AnswerDialog({ question, questionId }: IAnswerDialogProps) {
  const { setModalSuccess } = useTheme();
  const { modalAnswer, setModalAnswer } = useQuestion();
  const form = useForm<z.infer<ReturnType<typeof answerFormSchema>>>({
    resolver: zodResolver(answerFormSchema()),
    defaultValues: {
      bodyMd: '',
    },
  });

  const { mutate: createAnswer } = useCreateAnswer(questionId.toString());

  const onSubmit = async (data: z.infer<ReturnType<typeof answerFormSchema>>) => {
    createAnswer(
      { questionId, bodyMd: data?.bodyMd },
      {
        onSuccess: () => {
          setModalSuccess({
            title: 'Answer Submitted',
            message: 'Your answer has been submitted successfully.',
            open: true,
            animation: 'success',
          });
          form.reset();
        },
      },
    );
    setModalAnswer(false);
  };

  const handleClose = () => {
    setModalAnswer(false);
    form.reset();
  };

  return (
    <Dialog
      open={modalAnswer}
      onOpenChange={handleClose}
    >
      <DialogContent className="!max-w-5xl">
        <DialogHeader>
          <DialogTitle>Your Answer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12 gap-4 items-stretch">
              <div className="col-span-12 lg:col-span-4">
                <h4 className="text-lg font-medium">Question</h4>
                <p className="text-lg font-normal max-h-72 overflow-hidden overflow-y-auto">
                  {question}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-8 h-full">
                <CustomField
                  control={form.control}
                  name="bodyMd"
                  render={({ field }) => (
                    <Textarea
                      placeholder="Write your answer here"
                      className="h-72"
                      {...field}
                    />
                  )}
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
