"use client"
import React from 'react'
import Hero from "@/components/Hero"
import HowToUse from '@/components/HowToUse'
import Benefits from '@/components/Benefits'
import UpcomingFeatures from '@/components/UpcomingFeatures'
import CTA from '@/components/CTA'
const page = () => {
  return (
    <>

    <Hero/>
    <HowToUse/>
    <Benefits/>
 
    <UpcomingFeatures/>
    <CTA/>
    </>
    
  )
}

export default page