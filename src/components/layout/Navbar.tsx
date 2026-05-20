"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-sm"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center overflow-hidden">
            <img
              src="/icon.svg"
              alt="Isaac Reis Logo"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="font-mono text-sm tracking-widest uppercase font-bold text-foreground group-hover:text-primary transition-colors">
            Isaac Reis
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#cases" className="hover:text-primary transition-colors">
            Cases
          </a>
          <a href="#stack" className="hover:text-primary transition-colors">
            Stack
          </a>
          <a href="#process" className="hover:text-primary transition-colors">
            Processo
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contato
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
