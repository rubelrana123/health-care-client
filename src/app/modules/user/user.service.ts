//user service here
import bcrypt from 'bcryptjs';
import { createPatientRequest } from "./user.interface";
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { fileUploader } from '../../helpers/FileUploader';

 const createPatient = async (req: Request) => {

    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file) as any
        req.body.patient.profilePhoto = uploadResult?.secure_url 
        console.log(uploadResult, "upload result from service")
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx : any) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;
}

export const UserService = {
    createPatient
}