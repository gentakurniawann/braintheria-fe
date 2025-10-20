import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useTheme from "@/stores/theme";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function QuestionDialog() {
  const { modalQuestion, setModalQuestion } = useTheme();

  useEffect(() => {
    console.log("Modal Question State:", modalQuestion);
  }, [modalQuestion]);

  return (
    <Dialog open={modalQuestion} onOpenChange={setModalQuestion}>
      <DialogContent className="!max-w-3xl">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="Write your question here" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Select defaultValue="1">
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select prize" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Coins className="inline-block mr-1 w-6 h-6 text-primary" />
                <span className="text-xs text-primary font-normal">
                  you have 10 coins now
                </span>
              </div>
            </div>
            <Button variant="default" size={"lg"}>
              Submit Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
