"use client";

import { motion } from "framer-motion";
import { Section } from "../layout/Section";

const layers = [
  {
    category: "Frontend Engineering",
    skills: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Performance",
    ],
    color: "border-blue-500/30 text-blue-400",
  },
  {
    category: "Backend & Data",
    skills: [
      "Node.js",
      "PHP",
      "Java",
      "APIs REST/GraphQL",
      "SQL / NoSQL",
      "Arquitetura",
      "Serverless",
      "Autenticação",
    ],
    color: "border-emerald-500/30 text-emerald-400",
  },
  {
    category: "Product & UX",
    skills: [
      "UX Engineering",
      "Figma",
      "Design Systems",
      "Acessibilidade (WCAG)",
      "Prototipação",
    ],
    color: "border-purple-500/30 text-purple-400",
  },
  {
    category: "Creative Tech",
    skills: [
      "Canvas / WebGL",
      "Interactive UI",
      "Games",
      "Motion Design",
      "Creative Coding",
    ],
    color: "border-pink-500/30 text-pink-400",
  },
];

export function StackLayers() {
  return (
    <Section id="stack" className="py-16 bg-card/30 border-y border-border/40">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Camadas de Pensamento
          </h2>
          <p className="text-muted-foreground">
            A tecnologia é apenas o meio. Meu stack mental é estruturado em
            camadas para garantir que cada decisão técnica sirva a um propósito
            de negócio e de experiência do usuário.
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-background hover:bg-card transition-colors"
            >
              <h3
                className={`text-lg font-mono font-semibold uppercase tracking-wider ${layer.color.split(" ")[1]}`}
              >
                {layer.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {layer.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-sm px-3 py-1 rounded-md border bg-background/50 ${layer.color} transition-colors group-hover:border-opacity-100 group-hover:bg-opacity-10`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
