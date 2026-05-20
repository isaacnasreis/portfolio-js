"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Section } from "../layout/Section"

const steps = [
  {
    title: "Descoberta & Escopo",
    description: "Mergulho profundo no problema de negócio para garantir que estamos construindo a coisa certa, não apenas construindo certo."
  },
  {
    title: "Arquitetura & Design",
    description: "Definição do fluxo de dados, stack tecnológica e design system, garantindo escalabilidade e consistência visual."
  },
  {
    title: "Prototipação Interativa",
    description: "Provas de conceito e interfaces clicáveis de alta fidelidade para validar hipóteses antes de gastar tempo de engenharia."
  },
  {
    title: "Desenvolvimento & Motion",
    description: "Engenharia de frontend e backend com atenção obsessiva aos detalhes, performance e micro-interações."
  },
  {
    title: "Refinamento & Entrega",
    description: "Auditoria rigorosa de acessibilidade, testes de performance e otimização de SEO para garantir um produto premium."
  }
]

export function Process() {
  return (
    <Section id="process" className="py-32">
      <div className="flex flex-col gap-16 items-center text-center">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">O Processo</h2>
          <p className="text-muted-foreground text-lg">
            Como transformo complexidade em produtos digitais intuitivos e memoráveis.
          </p>
        </div>

        <div className="w-full max-w-4xl relative">
          {/* Linha conectora central */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2"></div>
          
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`w-full md:w-1/2 flex ${i % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`bg-card/50 border border-border p-6 rounded-2xl max-w-md ${i % 2 !== 0 ? 'text-left' : 'md:text-right text-left'}`}>
                    <div className="text-primary font-mono text-sm mb-2 opacity-80">FASE 0{i + 1}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Node central */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.5)] border-4 border-background z-10"></div>
                
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
