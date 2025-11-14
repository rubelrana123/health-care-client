import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
 
import validateRequest from "../../middlewares/validateRequest";
import { doctorScheduleValidation } from "./doctorSchedule.validation";
 

const router = express.Router();

router.post(
    "/", validateRequest(doctorScheduleValidation.createDoctorScheduleValidationSchema),
    auth(UserRole.DOCTOR, UserRole.ADMIN),
    DoctorScheduleController.insertIntoDB
)

export const doctorScheduleRoutes = router;