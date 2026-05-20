"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Section } from "../layout/Section"
import { Database, Layout, Gamepad2, Code2, Cpu, Wrench } from "lucide-react"

const cases = [
  {
    title: "Full Stack Systems",
    description: "Arquiteturas resilientes, APIs escaláveis e bancos de dados otimizados.",
    icon: Database,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-card to-background",
  },
  {
    title: "UX Engineering",
    description: "Interfaces fluidas com foco em acessibilidade e micro-interações.",
    icon: Layout,
    className: "md:col-span-1 md:row-span-1 bg-card/50",
  },
  {
    title: "Games & Creative Tech",
    description: "Lógica avançada, performance de renderização e systems thinking.",
    icon: Gamepad2,
    className: "md:col-span-1 md:row-span-1 bg-card/50",
  },
  {
    title: "Web Solutions (WP/CMS)",
    description: "Plataformas comerciais de alta conversão e performance extrema.",
    icon: Code2,
    className: "md:col-span-1 md:row-span-1 bg-card/50",
  },
  {
    title: "Automation & Tools",
    description: "DX, pipelines e ferramentas internas que multiplicam produtividade.",
    icon: Wrench,
    className: "md:col-span-1 md:row-span-1 bg-card/50",
  }
]

export function Cases() {
  return (
    <Section id="cases" className="py-32">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Casos de Engenharia e Produto</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Não coleciono telas, resolvo problemas. Cada projeto é uma combinação de arquitetura robusta e experiência do usuário elevada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-border/50 p-8 flex flex-col justify-between group hover:border-primary/30 transition-colors ${item.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
