import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Form } from '@/components/ui/form';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const questionFormSchema = z.object({
  bodyMd: z.string().min(10, 'Question must be at least 10 characters'),
  bounty: z.string().nonempty('Please select a prize'),
});

import useTheme from '@/stores/theme';
import { CustomField } from '@/components/ui/form-field';

export default function QuestionDialog() {
  const { modalQuestion, setModalQuestion } = useTheme();

  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      bodyMd: '',
      bounty: '',
    },
  });

  const onSubmit = (data: z.infer<typeof questionFormSchema>) => {
    console.log('Form Data:', data);
    // Here you can call your mutation to submit the question
    setModalQuestion(false);
    form.reset();
  };
  useEffect(() => {
    console.log('Modal Question State:', modalQuestion);
  }, [modalQuestion]);

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
                      <Select
                        defaultValue="all"
                        {...field}
                      >
                        <SelectTrigger className="w-fit">
                          <SelectValue placeholder="Select prize" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="answered">Answered</SelectItem>
                          <SelectItem value="unanswered">Unanswered</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <div>
                    <Coins className="inline-block mr-1 w-6 h-6 text-primary" />
                    <span className="text-xs text-primary font-normal">you have 10 coins now</span>
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
