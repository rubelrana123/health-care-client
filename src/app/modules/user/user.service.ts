//user service here
import bcrypt from 'bcryptjs'; 
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { fileUploader } from '../../helpers/FileUploader';
import { Admin, Doctor, Prisma, UserRole } from '@prisma/client';
import { userSearchableFields } from './user.constant';
import { IOptions, paginationHelper } from '../../helpers/paginationHelpers';
 
 const createPatient = async (req: Request) => {
 
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file) as any
        req.body.patient.profilePhoto = uploadResult?.secure_url 
        console.log(uploadResult, "upload result from service")
    }
  console.log(req.body, "body from servic e")

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx : any) => {
        await tnx.user.create({
            data: {
                 email: req.body.patient.email,
                 password: hashPassword,
                 role: UserRole.PATIENT

            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;
}

const createAdmin = async (req: Request): Promise<Admin> => {

    console.log(req.body, "body from admin service")
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        console.log(uploadToCloudinary, "upload image dfrom admin")
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {
    
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file) as any
        req.body.patient.profilePhoto = uploadResult?.secure_url 
        console.log(uploadResult, "upload result from service")
    }
  console.log(req.body, "body data after setting photo");

  // ✅ Hash password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  // ✅ Prepare user data
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  // ✅ Transaction: create User then Doctor
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({ data: userData });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};


const getAllFromDB = async (params: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.user.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.user.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}
export const UserService = {
    createPatient,
    createAdmin, 
    createDoctor,
    getAllFromDB
}