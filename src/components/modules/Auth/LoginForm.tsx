/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
 
import Link from 'next/link'
import { loginUser } from '@/services/auth/loginUser';
import { toast } from 'sonner';
 

export  const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, action, isPending] = useActionState(loginUser, null);
console.log(state, action, isPending, "from form")

    const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };


  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  console.log(state);
 console.log(state, "state here from login form")
  return (
    <div>
      <form action={action}>
        <CardContent>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
            {redirect && <input type="hidden" name="redirect" value={redirect} />}
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                defaultValue={"rubelrana@gmail.com"}
                
              />
            {getFieldError("email") && (
              <p className="text-red-600">
                {getFieldError("email")}
              </p>
            )}
   
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forget-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password"  defaultValue={"123456"} />
                          {getFieldError("password") && (
              <p className="text-red-600">
                {getFieldError("password")}
              </p>
            )}
            </div>

          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <Button variant="outline" className="w-full">
            Login with Google
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Create new account
            </Link>
          </p>
        </CardFooter>
      </form>
    </div>
  );
};
