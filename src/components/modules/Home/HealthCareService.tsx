 
// Geometric Icons Components

import { GearsIcon, ShieldIcon, TestTubeIcon, VideoIcon } from "@/assets/svg/svg"
import { Title } from "@/components/reusable/title"
import {   MoveRight  } from "lucide-react"

type Service = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  accentColor: string
}
const services: Service[] = [
  {
    id: 1,
    title: 'Live Video Consultation',
    description:
      'Instant video consultation now or schedule a future appointment',
    icon: <VideoIcon />,
    accentColor: 'bg-electricBlue',
  },
  {
    id: 2,
    title: 'Healthcare Packages',
    description: 'Consultations, hospital care, insurance & more',
    icon: <ShieldIcon />,
    accentColor: 'bg-coral',
  },
  {
    id: 3,
    title: 'Diagnostic at your doorstep',
    description:
      'Get tested in few hours at home & get report in the app within 24 hours',
    icon: <TestTubeIcon />,
    accentColor: 'bg-mint',
  },
  {
    id: 4,
    title: 'Healthcare IT Services',
    description:
      'Our expert engineer can help building your health-tech solutions',
    icon: <GearsIcon />,
    accentColor: 'bg-amber',
  },
]
export function HealthcareServices() {
  return (
    <div className=" bg-slate-50 py-20 px-4 ">
    <Title
      title="Healthcare Services"
      text="Discover Our Comprehensive Healthcare Services Tailored to Your Needs"
    />
<section className="w-full flex items-center justify-center">
  <div className="max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service) => (
<div
  key={service.id}
  className="
    group bg-white rounded-3xl p-8 shadow-xl border border-slate-100
    flex flex-col items-center text-center
    h-[360px] w-full
    transition-all duration-300 ease-out
    hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200
  "
>
  {/* Icon */}
  <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
    {service.icon}
  </div>

  {/* Title */}
  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
    {service.title}
  </h3>

  {/* Description */}
  <p className="text-slate-500 text-sm leading-relaxed font-medium">
    {service.description}
  </p>

  {/* Hover Button */}
  <div
    className="
      mt-4 opacity-0 translate-y-2
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-300
    "
  >
    <MoveRight className="size-10" />
  </div>
</div>

      ))}
    </div>
  </div>
</section>       
    </div>


  )
}
