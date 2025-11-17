import express from "express";
import { DoctorController } from "./doctor.controller";
const router = express.Router();

// Doctor Management

// Implement delete doctor by ID functionality.
// Implement get doctor by ID functionality.


router.get(
    "/",
    DoctorController.getAllFromDB
)
router.post("/suggestion", DoctorController.getAISuggestions);

router.patch(
    "/:id",
    DoctorController.updateIntoDB
)
// - Implement **delete doctor by ID** functionality.
router.delete(
    "/:id",
    DoctorController.deleteFromDB
)
export const DoctorRoutes = router;