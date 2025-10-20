"use client";
import React from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Crown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import AnswerDialog from "@/components/global/dialog/answer";

import useQuestion from "@/stores/menu/question";
import { Leaderboard } from "@/constant/dashboard";

export default function Question() {
  const answered = true;
  const { setModalAnswer } = useQuestion();

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
                  <span className="text-sm font-medium">aku_pintar888</span>
                  <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
                  <p className="text-xs font-normal text-slate-500">
                    16 minutes ago
                  </p>
                </div>
              </div>
              <Badge variant={"default"}>
                <Coins className="w-3 h-3" />
                +0.01
                <span className="hidden lg:block">ETH</span>
              </Badge>
            </div>
            <p className="text-lg font-normal mt-4 mb-6">
              The line g:2x+4y-3=0 is dilated with a scale factor of -2 towards
              the center point (2, -4). The equation of the line g after
              dilation is...
            </p>
            <Button
              size={"lg"}
              className="max-w-40"
              variant={"outline"}
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
                src={"/images/waiting-image.png"}
                alt="waiting-image"
                width={360}
                height={237}
              />
              <div className="text-center">
                <h3 className="text-2xl font-medium max-w-72">
                  aku_pintar888 is waiting for your help.
                </h3>
                <span className="text-base text-slate-500">
                  Give answers and earn coins.
                </span>
              </div>
              <Button
                size={"lg"}
                className="max-w-72 w-full"
                variant={"outline"}
              >
                <Plus />
                Add an Answer
              </Button>
            </div>
          </Card>
          {answered && (
            <Card className="glass-background p-6 rounded-2xl w-full">
              <div className="flex flex-row justify-between items-center">
                <h4 className="text-lg font-bold">Answer</h4>
                <Button size={"sm"} variant={"outline"}>
                  Validate
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row gap-2 items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-300" />
                <div>
                  <span className="text-sm font-medium">aku_pintar888</span>
                  <p className="text-xs font-normal text-slate-500">
                    16 minutes ago
                  </p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Card>
          )}
          {/* Other Questions to Answer */}
          <Card className="glass-background p-6 rounded-2xl w-full">
            <h4 className="text-lg font-bold mb-4">Answer other questions</h4>
            <div className="space-y-4">
              <div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-300" />
                    <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                      <span className="text-sm font-medium">aku_pintar888</span>
                      <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
                      <p className="text-xs font-normal text-slate-500">
                        16 minutes ago
                      </p>
                    </div>
                  </div>
                  <Badge variant={"default"}>
                    <Coins className="w-3 h-3" />
                    +0.01
                    <span className="hidden lg:block">ETH</span>
                  </Badge>
                </div>
                <p className="text-lg font-normal mt-4 mb-6">
                  The line g:2x+4y-3=0 is dilated with a scale factor of -2
                  towards the center point (2, -4). The equation of the line g
                  after dilation is...
                </p>
                <div className="flex justify-end mb-4">
                  <Button size={"lg"} className="max-w-32" variant={"outline"}>
                    Answer
                  </Button>
                </div>
                <Separator />
              </div>
              <div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-300" />
                    <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                      <span className="text-sm font-medium">aku_pintar888</span>
                      <div className="hidden sm:block w-1 h-1 bg-primary rounded-full" />
                      <p className="text-xs font-normal text-slate-500">
                        16 minutes ago
                      </p>
                    </div>
                  </div>
                  <Badge variant={"default"}>
                    <Coins className="w-3 h-3" />
                    +0.01
                    <span className="hidden lg:block">ETH</span>
                  </Badge>
                </div>
                <p className="text-lg font-normal mt-4 mb-6">
                  The line g:2x+4y-3=0 is dilated with a scale factor of -2
                  towards the center point (2, -4). The equation of the line g
                  after dilation is...
                </p>
                <div className="flex justify-end mb-4">
                  <Button size={"lg"} className="max-w-32" variant={"outline"}>
                    Answer
                  </Button>
                </div>
                <Separator />
              </div>
            </div>
          </Card>
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
      <AnswerDialog />
    </div>
  );
}
