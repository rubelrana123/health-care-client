const insertIntoDB =(payload : any)=> {
//  {
//     "startDate": "2024-02-20",
//     "endDate": "2024-03-22",
//     "startTime": "10:00",
//     "endTime": "18:00"
// }
    const {startDate, endDate, startTime, endTime} = payload;

    const interval = 30; // minutes
 
    const start = new Date(startDate);
    const end = new Date(endDate);
    
     //install date-fns package

     while(start <= end){
        let currentTime = new Date(start);
        currentTime.setHours(parseInt(startTime.split(":")[0]), parseInt(startTime.split(":")[1]), 0, 0);
        const endOfDay = new Date(start);
        endOfDay.setHours(parseInt(endTime.split(":")[0]), parseInt(endTime.split(":")[1]), 0, 0);

        while(currentTime < endOfDay){
            const slotStart = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + interval);
            const slotEnd = new Date(currentTime);

            // Here you can insert the slot into the database
            console.log(`Slot: ${slotStart.toISOString()} - ${slotEnd.toISOString()}`);
        }
    }
     console.log(payload)
     return payload;
}
export const ScheduleService = {
    insertIntoDB,
};