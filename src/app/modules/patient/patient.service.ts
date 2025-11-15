import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { IOptions, paginationHelper } from "../../helpers/paginationHelpers";
import { patientSearchableFields } from "./patient.constant";

const getAllPatient = async (filters: any, options: IOptions) => {
   const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
      const { searchTerm, specialties, ...filterData } = filters;
  
      const andConditions: Prisma.PatientWhereInput[] = [];
  
      if (searchTerm) {
          andConditions.push({
              OR: patientSearchableFields.map((field) => ({
                  [field]: {
                      contains: searchTerm,
                      mode: "insensitive"
                  }
              }))
          })
      }
 
      if (Object.keys(filterData).length > 0) {
          const filterConditions = Object.keys(filterData).map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
  
          andConditions.push(...filterConditions)
      }


   const whereConditions: Prisma.PatientWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.patient.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.patient.count({
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


const deletePatientFromDB = async (id: string) => {
    return await prisma.patient.delete({
        where: {
            id
        }
    })
}
export const PatientService = {
    getAllPatient,
    // updatePatientById,
    deletePatientFromDB,
}