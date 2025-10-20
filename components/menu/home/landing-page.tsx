import React from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center w-[992px] text-blue-950 mb-12">
        Get Answers. Earn Tokens. Own Your Reputation.
      </h1>
      <div className="w-[642px]">
        <Input
          placeholder="Search Your Question..."
          icon={Search}
          className="w-full h-10 glass-background text-blue-950"
          iconClassName="text-blue-950"
        />
      </div>
      <Image
        src="/images/banner-image.png"
        alt="banner-image"
        width={612}
        height={450}
        className="mt-[-108px]"
      />
    </div>
  );
}
