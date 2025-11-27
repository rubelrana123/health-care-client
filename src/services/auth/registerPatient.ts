'use server';

import z from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});
export const registerPatient = async (_prevState : any, formData : any ) => { 

    const registerPatientData = {

        password: formData.get("password"),
        patient : {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
        }
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerPatientData));

    const res = await fetch('http://localhost:5000/api/v1/user/create-patient', {
        method: 'POST',
        body: newFormData,
    });

    if (!res.ok) {
        throw new Error('Failed to register patient');
    }       

    const data = await res.json();
    return data;
 
}
 