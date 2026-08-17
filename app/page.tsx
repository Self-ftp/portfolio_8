import { About } from '@/components/home/About'
import { Contact } from '@/components/home/Contact'
import { Experience } from '@/components/home/Experience'
import { Hero } from '@/components/home/Hero'
import { Projects } from '@/components/home/Projects'
import { WhatIDo } from '@/components/home/WhatIDo'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <WhatIDo />
      <Experience />
      <Contact />
    </>
  )
}
