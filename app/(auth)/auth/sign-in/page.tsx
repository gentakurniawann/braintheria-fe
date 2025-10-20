import React from "react";
import { Card } from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full items-center justify-center lg:items-stretch">
      <div className="w-1/3 bg-login rounded-2xl"></div>
      <div className="w-2/3 h-full">
        <Card className="w-full h-full glass-background p-6 rounded-2xl">
          <h2>Sign In</h2>
        </Card>
      </div>
    </div>
  );
}
