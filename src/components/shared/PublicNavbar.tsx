import { Menu, Moon, Stethoscope, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";
export async function PublicNavbar() {
  const navItems = [
    { href: "/consultation", label: "Consultation" },
    { href: "/health-plan", label: "Health Plans" },
    { href: "/medicine", label: "Medicine" },
    { href: "/diagnostics", label: "Diagnostics" },
    { href: "/ngos", label: "NGOs" },
  ];

  const accessToken = await getCookie("accessToken");
  return (
    <nav className="sticky top-0 z-50 bg-white/80 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>

            <span className="text-2xl font-bold text-primary">Amer Doctor</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700   hover:text-primary/80 dark:hover:text-primary/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {Date() === "light" ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Login Button */}{
              accessToken ?

              <LogoutButton/>
              : 
               <Link href="/login">
              <Button size="default">Login</Button>
            </Link>
            }

          </div>
           {/* mobile navs */}
          <div className="md:hidden">
            <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
 
        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-5">
             {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700   hover:text-primary/80 dark:hover:text-primary/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
        </div>
        <SheetFooter>
            <Link href="/login">
              <Button size="default">Login</Button>
            </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>

          </div>
        </div>
      </div>
    </nav>
  );
}
