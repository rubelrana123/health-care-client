import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
 
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";
import { DoctorService } from "./doctor.service";
import { doctorFilterableFields } from "./doctor.constant";
 

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, doctorFilterableFields)
   console.log(req.query, "query from controller")
    const result = await DoctorService.getAllFromDB(fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor fetched successfully!",
        meta: result.meta,
        data: result.data
    })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await DoctorService.updateIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor updated successfully!",
        data: result
    })
})


const deleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await DoctorService.deleteFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor deleted successfully!",
        data: result
    })
}
);

export const DoctorController = {
    getAllFromDB,
    updateIntoDB,
    deleteFromDB
}