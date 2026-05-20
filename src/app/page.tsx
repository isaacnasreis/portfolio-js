import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Cases } from "@/components/sections/Cases"
import { StackLayers } from "@/components/sections/StackLayers"
import { Process } from "@/components/sections/Process"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cases />
      <StackLayers />
      <Process />
      <Contact />
    </>
  )
}
