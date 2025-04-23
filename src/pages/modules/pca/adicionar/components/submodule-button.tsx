import React from "react";
import { Button as ButtonBase } from "@/components/ui/button";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <ButtonBase className="w-full h-10 bg-primary-light/20 hover:bg-primary-light/25 transition-colors duration-100 ease-in-out cursor-pointer select-none">
      {children}
    </ButtonBase>
  );
}
