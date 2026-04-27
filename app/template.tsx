"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="motion-reduce:animate-none animate-in fade-in-0 slide-in-from-bottom-1 duration-page ease-out"
    >
      {children}
    </div>
  );
}

