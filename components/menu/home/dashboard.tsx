import React from "react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Coins, Crown } from "lucide-react";

import { subjects } from "@/constant/dashboard";
import { Leaderboard } from "@/constant/dashboard";
import { Question } from "@/constant/dashboard";

import useTheme from "@/stores/theme";
import Link from "next/link";

export default function Dashboard() {
  const { setModalQuestion } = useTheme();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="hidden lg:block lg:col-span-2">
        <Card className="glass-background p-6 rounded-2xl w-full">
          <div className="flex gap-2 items-center">
            <BookOpen className="h-6 w-6" />
            <h4 className="text-lg font-bold">Subject</h4>
          </div>
          <Separator className="my-4" />
          <ul>
            {subjects.map((subject) => (
              <li
                key={subject.id}
                className="text-sm py-1 px-2 cursor-pointer hover:bg-primary hover:text-white rounded-md"
              >
                {subject.name}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <Card className="glass-background p-6 rounded-2xl w-full">
          <h2 className="text-4xl font-bold mb-4">Have A Question?</h2>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-fit"
            onClick={() => setModalQuestion(true)}
          >
            Ask Now
          </Button>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Select>
              <SelectTrigger className="w-[180px] mb-4">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {Question.map((q) => (
            <div key={q.id}>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-300" />
                  <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                    <span className="text-sm font-medium">{q.username}</span>
                    <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
                    <p className="text-xs font-normal text-slate-500">
                      {q.time}
                    </p>
                  </div>
                </div>
                <Badge variant={"default"}>
                  <Coins className="w-3 h-3" />+{q.prize}
                  <span className="hidden lg:block">ETH</span>
                </Badge>
              </div>
              <p className="text-lg font-normal mt-4 mb-6">{q.question}</p>
              <div className="flex justify-end">
                <Link href={`/question/${q.id}`}>
                  <Button size={"lg"} className="max-w-32" variant={"outline"}>
                    Answer
                  </Button>
                </Link>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </Card>
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
              <li key={index} className="text-sm py-1 px-2">
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
    </div>
  );
}
