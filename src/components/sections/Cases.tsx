"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Server } from "lucide-react";
import Image from "next/image";
import { FaFigma, FaGithub } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { Section } from "../layout/Section";

const cases = [
  {
    title: "Concurseiro AI",
    description:
      "Ecossistema completo de estudos impulsionado por Inteligência Artificial (Google Gemini). Gera simulados infinitos, simplifica PDFs jurídicos e cria planos de estudo mentorados. Arquitetura moderna, assíncrona e desacoplada, com extrema atenção à segurança (Rate Limiting) e uma UI Glassmorphism de alta conversão.",
    tags: ["Vue 3", "FastAPI", "Python", "Google Gemini", "PostgreSQL"],
    category: "AI Software Engineering",
    link: "https://concurseiro-ai-frontend.vercel.app/",
    repoUrl: "https://github.com/isaacnasreis/concurseiro-ai-frontend",
    backendRepoUrl: "https://github.com/isaacnasreis/concurseiro-ai-backend",
    image: "/projects/concurseiro-ai.webp",
    className:
      "md:col-span-2 md:row-span-2 bg-gradient-to-br from-card to-background",
  },
  {
    title: "StabArts E-commerce",
    description:
      "Plataforma completa de e-commerce com SSR, painel administrativo protegido e state management reativo.",
    tags: ["Nuxt 3", "Vue", "Pinia", "TypeScript"],
    category: "Full Stack Systems",
    link: "https://ecommercestabarts.vercel.app/",
    repoUrl: "https://github.com/isaacnasreis/ecommercestabarts",
    figmaUrl:
      "https://www.figma.com/design/mOO94q7ZGuq98SCoQl1NN1/E-Commerce---Stab-ARTS?node-id=38208-37&p=f",
    notionUrl:
      "https://www.notion.so/StabArts-E-commerce-35de39ea274c8042a87ad9944892ec1d?source=copy_link",
    image: "/projects/projeto-stabarts.webp",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Santo Solar",
    description:
      "Web Solution de altíssima performance para conversão de leads corporativos, otimizada para SEO extremo.",
    tags: ["Astro", "React", "SSG"],
    category: "Web Solutions",
    link: "https://santosolar.com.br/",
    repoUrl: "https://github.com/isaacnasreis/sl-home",
    figmaUrl:
      "https://www.figma.com/design/sCxRL5H3e1Kztu4BNhIvkF/Web-Page-Solar-Energy?node-id=0-1&t=IKyB7HIUBDyKyvm5-1",
    image: "/projects/projeto-santoSolar.webp",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Flow State",
    description:
      "Gestor de rotina e foco com perfis isolados, banco de dados relacional e estética dark/neon imersiva.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    category: "Full Stack Systems",
    link: "https://rotina-flow.vercel.app/",
    repoUrl: "https://github.com/isaacnasreis/rotina-flow",
    image: "/projects/projeto-flowState.webp",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Studio Ghibli UI",
    description:
      "Landing page que isola CSS Modules para construir um design autoral sensível, focado em UX e texturas cinematográficas.",
    tags: ["React 19", "Vite", "Motion"],
    category: "UX Engineering",
    link: "https://studio-ghibli-taupe.vercel.app",
    repoUrl: "https://github.com/isaacnasreis/studio-ghibli",
    figmaUrl:
      "https://www.figma.com/design/Yb9IBH56g7T1hdIyZ3BMNO/Desafios---CodeLab?node-id=5854-2",
    image: "/projects/projeto-studio-ghibli.webp",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "VortexAdmin",
    description:
      "Dashboard interativo projetado para processamento visual e data viz em ambientes B2B.",
    tags: ["Vue 3", "Data Viz"],
    category: "Automation & Tools",
    link: "https://vortexadmin.netlify.app/",
    repoUrl: "https://github.com/isaacnasreis/vortexadmin",
    image: "/projects/projeto-vortexAdmin.webp",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function Cases() {
  return (
    <Section id="cases" className="py-24">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Casos de Engenharia
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Sistemas em produção, arquiteturas resilientes e experiências
            interativas de alta fidelidade. Onde o design encontra a
            performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-border/50 p-6 flex flex-col group hover:border-primary/50 transition-colors ${item.className}`}
            >
              {/* Background Image & Overlay */}
              {item.image && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                </div>
              )}

              {/* Placeholder Background if no image */}
              {!item.image && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
              )}

              {/* Card Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
              >
                <span className="sr-only">Ver projeto {item.title}</span>
              </a>

              <div className="relative z-30 flex items-center justify-between mb-4 pointer-events-none">
                <span className="text-xs font-mono font-semibold text-primary tracking-wider uppercase drop-shadow-sm">
                  {item.category}
                </span>

                <div className="flex items-center gap-3">
                  {/* Backend Repo Icon (if exists) */}
                  {(item as any).backendRepoUrl && (
                    <a
                      href={(item as any).backendRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 pointer-events-auto text-muted-foreground hover:text-emerald-400 transition-colors"
                      title="Repositório Backend (API)"
                    >
                      <Server className="w-4 h-4 drop-shadow-md" />
                    </a>
                  )}
                  {item.repoUrl && (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 pointer-events-auto text-muted-foreground hover:text-primary transition-colors"
                      title="Repositório GitHub (Frontend)"
                    >
                      <FaGithub className="w-4 h-4 drop-shadow-md" />
                    </a>
                  )}
                  {(item as any).figmaUrl && (
                    <a
                      href={(item as any).figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 pointer-events-auto text-muted-foreground hover:text-primary transition-colors"
                      title="Arquivo Figma"
                    >
                      <FaFigma className="w-4 h-4 drop-shadow-md" />
                    </a>
                  )}
                  {(item as any).notionUrl && (
                    <a
                      href={(item as any).notionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 pointer-events-auto text-muted-foreground hover:text-primary transition-colors"
                      title="Doc Notion"
                    >
                      <SiNotion className="w-4 h-4 drop-shadow-md" />
                    </a>
                  )}
                  <ArrowUpRight className="w-5 h-5 ml-1 text-muted-foreground group-hover:text-primary transition-colors drop-shadow-md" />
                </div>
              </div>

              <div className="relative z-30 flex-1 flex flex-col justify-end pointer-events-none mt-auto">
                <h3 className="text-xl md:text-3xl font-bold mb-3 text-foreground drop-shadow-md tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground/90 line-clamp-4 mb-5 drop-shadow-sm">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-background/50 backdrop-blur-sm border border-border/50 text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
