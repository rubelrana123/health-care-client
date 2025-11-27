import { Footer } from "@/components/shared/Footer";
import { PublicNavbar } from "@/components/shared/PublicNavbar";

 
export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
    <PublicNavbar/>
    {children}
    <Footer/>    
    </>
  )
}
