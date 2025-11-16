import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
 
import pick from "../../helpers/pick";
import { PatientService } from "./patient.service";
import { patientFilterableFields } from "./patient.constant";
 
 
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
 const filters = pick(req.query, patientFilterableFields) // searching , filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting

    const result = await PatientService.getAllPatient(filters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patients fetched successfully!",
        data: result
    })
});

const updatePatientById = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientService.updatePatientById(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patient update successfully!",
        data: "result"
    })
})

const deletePatientFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientService.deletePatientFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patient deleted successfully!",
        data: result
    })
})
export const PatientController = {
    getAllPatient,
    updatePatientById,
    deletePatientFromDB,
  
};