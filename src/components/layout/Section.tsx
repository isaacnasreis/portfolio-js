import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("w-full py-24 md:py-32 relative z-10", className)}
      {...props}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {children}
      </div>
    </section>
  )
}
