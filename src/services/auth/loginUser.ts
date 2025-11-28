/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"   
// Tells Next.js this file contains Server Actions (must run on server)

// import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
// Utility functions for role-based routing

import { parse } from "cookie";
 
import { cookies } from "next/headers";
 

import z from "zod";
// For validation

// ------------------ ZOD VALIDATION SCHEMA ------------------
const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required")
        .min(6, {
            error: "Password is required and must be at least 6 characters long",
        })
        .max(100, {
            error: "Password must be at most 100 characters long",
        }),
});

// ------------------ MAIN LOGIN FUNCTION ------------------
export const loginUser = async (_currentState: any, formData: any)  => {
    try {

        // const redirectTo = formData.get('redirect') || null;
        // console.log("Requested redirect path =", redirectTo);

        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        console.log("Login data received:", loginData);

        // ------------------ VALIDATE USER INPUT ------------------
        const validatedFields = loginValidationZodSchema.safeParse(loginData);

        if (!validatedFields.success) {
            console.log("Validation errors:", validatedFields.error.issues);

            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message,
                }))
            };
        }

        console.log("Validation successful");

        // ------------------ SEND LOGIN REQUEST TO BACKEND ------------------
        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        });
   const result = await res.json()
        console.log("Backend responded with status:", res.status);

        // ------------------ GET SET-COOKIE HEADERS ------------------
        const setCookieHeaders = res.headers.getSetCookie();
        console.log("Raw Set-Cookie headers:", setCookieHeaders);

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                console.log("Parsed cookie =", parsedCookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }

                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            });
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) throw new Error("Access token missing in cookies");
        if (!refreshTokenObject) throw new Error("Refresh token missing in cookies");

        console.log("Access token extracted:", accessTokenObject.accessToken);
        console.log("Refresh token extracted:", refreshTokenObject.refreshToken);

        // ------------------ SET COOKIES IN NEXT.JS ------------------
        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        console.log("Access token stored in browser cookies");

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        console.log("Refresh token stored in browser cookies");

        console.log({
          res,
          result

        })

    } catch (error: any) {
         console.log("catch errror ", error)
        // NEXT_REDIRECT must be passed through (Next.js requires it)
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        console.log("Login error:", error);

        return { error: "Login failed" };
    }
};
