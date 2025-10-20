import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useQuestion from "@/stores/menu/question";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AnswerDialog() {
  const { modalAnswer, setModalAnswer } = useQuestion();

  return (
    <Dialog open={modalAnswer} onOpenChange={setModalAnswer}>
      <DialogContent className="!max-w-5xl">
        <DialogHeader>
          <DialogTitle>You Answer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-stretch">
            <div className="col-span-4">
              <h4 className="text-lg font-medium">Question</h4>
              <p className="text-lg font-normal">
                The line g:2x+4y-3=0 is dilated with a scale factor of -2
                towards the center point (2, -4). The equation of the line g
                after dilation is...
              </p>
            </div>
            <div className="col-span-8 ">
              <Textarea
                placeholder="Write your answer here"
                className="h-full"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="default" size={"lg"}>
              Add your Answer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
