 
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { RegisterForm } from '@/components/modules/Auth/RegisterForm'
export default function RegisterPage() {
  return (
    <div className="">
     <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your info below to register to your account
        </CardDescription>
      </CardHeader>
      <RegisterForm />
 
    </Card>

    </div>
  )
}
