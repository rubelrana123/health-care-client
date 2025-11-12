import { addMinutes, addHours, format } from "date-fns";
import { prisma } from "../../shared/prisma";
const insertIntoDB = async (payload: any) => {
    // Destructure the payload to extract date and time ranges for scheduling
    const { startTime, endTime, startDate, endDate } = payload;

    // Set the interval between each appointment slot (in minutes)
    const intervalTime = 30;
    // Array to store all created schedule records
    const schedules = [];

    // Initialize the current date to the start date - used for iterating through each day
    const currentDate = new Date(startDate);
    // Set the last date limit for the scheduling period
    const lastDate = new Date(endDate);

    // Outer loop: iterate through each day from startDate to endDate
    while (currentDate <= lastDate) {
        // Parse the start time (e.g., "11:00") and create a DateTime for the current day
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]) // Extract hours from time string
                ),
                Number(startTime.split(":")[1]) // Extract minutes from time string
            )
        )

        // Parse the end time (e.g., "17:00") and create a DateTime for the current day
        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0]) // Extract hours from time string
                ),
                Number(endTime.split(":")[1]) // Extract minutes from time string
            )
        )

        // Inner loop: create appointment slots from startDateTime to endDateTime
        while (startDateTime < endDateTime) {
            // Define the start time of the current slot
            const slotStartDateTime = startDateTime;
            // Define the end time of the current slot (start + intervalTime)
            const slotEndDateTime = addMinutes(startDateTime, intervalTime);

            // Prepare the schedule data object for database insertion
            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            // Check if a schedule slot with these exact times already exists in the database
            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })

            // Only create a new schedule record if it doesn't already exist (avoid duplicates)
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                // Add the newly created schedule to the results array
                schedules.push(result)
            }

            // Move to the next slot by incrementing the start time by intervalTime minutes
            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        // Move to the next day for scheduling
        currentDate.setDate(currentDate.getDate() + 1)
    }

    // Return all created schedule slots
    return schedules;
}

export const ScheduleService = {
    insertIntoDB,
}