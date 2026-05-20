"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <Section className="min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full flex flex-col items-start gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider"
        >
          <Terminal className="w-3 h-3" />
          <span>System Initialized</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1.1] max-w-4xl"
        >
          Construindo aplicações{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 pr-0.5">
            escaláveis
          </span>{" "}
          da arquitetura ao pixel.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed"
        >
          Full Stack · UX Engineering · Product Thinking
          <br />
          Eu não apenas escrevo código. Eu projeto e construo hubs digitais
          premium, unindo engenharia de ponta com design cinematográfico.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Button variant="glow" size="lg" className="gap-2" asChild>
            <a href="#contact">
              Iniciar Projeto <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#cases">Explorar Cases</a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
