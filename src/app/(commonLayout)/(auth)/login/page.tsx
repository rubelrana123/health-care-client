 
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "@/components/modules/Auth/LoginForm"
export default function RegisterPage() {
  return (
    <div className="">
     <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your info below to login to your account
        </CardDescription>
      </CardHeader>
      <LoginForm />
 
    </Card>

    </div>
  )
}
