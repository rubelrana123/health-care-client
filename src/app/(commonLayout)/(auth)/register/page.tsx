 
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RegisterForm } from '@/components/modules/Auth/RegisterForm'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {

  const params = (await searchParams) || {};
  return (
    <div className="">
     <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your info below to register to your account
        </CardDescription>
      </CardHeader>
      <RegisterForm   redirect={params.redirect}/>
 
    </Card>

    </div>
  )
}
