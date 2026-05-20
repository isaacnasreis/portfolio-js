import { cn } from "@/lib/utils";
import * as React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full py-16 md:py-16 relative", className)}
      {...props}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {children}
      </div>
    </section>
  );
}
