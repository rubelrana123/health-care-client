import FeaturedDoctor from "@/components/modules/Home/FeaturedDoctor";
import { HealthcareServices } from "@/components/modules/Home/HealthCareService";
import Hero from "@/components/modules/Home/Hero";
import OurPartners from "@/components/modules/Home/OurPartner";
 

export default function Home() {
  return (
    <div>
    <Hero />
    <HealthcareServices/>
      <FeaturedDoctor/>
    <OurPartners/>
    </div>
  );
}
