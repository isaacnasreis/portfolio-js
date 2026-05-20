"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, Mail, MessageSquare } from "lucide-react";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";

export function Contact() {
  return (
    <Section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)] mb-8"
        >
          <MessageSquare className="w-8 h-8 text-black" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
        >
          Vamos construir sua próxima aplicação?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12"
        >
          Seja um novo produto digital, uma reformulação arquitetural ou a
          solução para gargalos complexos de engenharia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="glow"
            size="lg"
            className="gap-2 w-full sm:w-auto"
            asChild
          >
            <a href="mailto:contato@isaacreis.com">
              <Mail className="w-5 h-5" /> contato@isaacreis.com
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 w-full sm:w-auto"
            asChild
          >
            <a
              href="https://linkedin.com/in/isaacnreis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Briefcase className="w-5 h-5" /> LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 w-full sm:w-auto"
            asChild
          >
            <a
              href="https://github.com/isaacnasreis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="w-5 h-5" /> GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Footer minimalista */}
      <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Isaac Reis. Arquitetado e construído
          com precisão.
        </p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sistemas Operacionais</span>
        </div>
      </div>
    </Section>
  );
}
