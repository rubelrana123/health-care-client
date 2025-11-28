/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerPatient } from "@/services/auth/registerPatient";

export const RegisterForm = () => {

  // Hook: manages form submission + returned state
  const [state, action, isPending] = useActionState(registerPatient, null);
  console.log(state, "state");

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      if (error) {
        return error.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
 
  return (
    <div>
      <CardContent>

        {/* Important: form must call the action returned from the hook */}
        <form className="flex flex-col gap-6" action={action}>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"     // important
              type="text"
              placeholder="Your full name"
              required
            />
            {getFieldError("name") && (
              <p className="text-red-600">
                {getFieldError("name")}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
     {getFieldError("email") && (
              <p className="text-red-600">
                {getFieldError("email")}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Your address"
              required
            />
                        {getFieldError("address") && (
              <p className="text-red-600">
                {getFieldError("address")}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="******"
              required
            />
                        {getFieldError("confirmPassword") && (
              <p className="text-red-600">
                {getFieldError("confirmPassword")}
              </p>
            )}
          </div>

          {/* Submit inside form */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>

        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">

        {/* Just a button, not form submit */}
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>

        {/* Show returned state */}
        {state && <p className="text-sm text-green-600">{state.message}</p>}
       <p>
    Already have an account?{" "}
    <a
      href="/login"
      className="underline underline-offset-4 hover:text-primary"
    >
      Login here
    </a>
       </p>
      </CardFooter>
    </div>
  );
};
