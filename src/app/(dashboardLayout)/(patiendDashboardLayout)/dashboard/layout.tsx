import LogoutButton from "@/components/shared/LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";

 
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await getCookie("accessToken");
  return <div>
    {children}
    {
      accessToken && <LogoutButton/>
    }
    </div>;
}
