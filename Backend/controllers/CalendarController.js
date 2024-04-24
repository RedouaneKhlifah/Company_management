import asynchandler from "express-async-handler";
import Calendar from "../models/CalendarModal.js";


const fetchCalendar = asynchandler(async(req , res)=>{
    const CalendarDates = await Calendar.find()
    res.json(CalendarDates);
})

const ceateDateCalender = asynchandler(async(req , res)=>{
    const calendarDate = await Calendar.create(req.body)
    res.json(calendarDate)
})

const updateDateCalender = asynchandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the Calendar document exists
    const calendarDate = await Calendar.findById(id);
    if (!calendarDate) {
        return res.status(404).json({ message: "CalendarDate not found" });
    }

    // Update the Calendar document
    const updatedCalendarDate  = await Calendar.findByIdAndUpdate(id, updateData, { new: true });

    // Fetch the updated Calendar document
    res.json(updatedCalendarDate);
});

const DeleteDateCalender = asynchandler(async (req, res) => {
    // Step 1: Retrieve the calendar event ID from the request parameters
    const { id } = req.params;

    // Step 2: Use the ID to find the calendar event in the database
    const calendarEvent = await Calendar.findById(id);

    // Step 3: If the calendar event exists, delete it
    if (!calendarEvent) {
        // Step 4: Respond with an error message if the calendar event is not found
        return res.status(404).json({ message: "Calendar event not found" });
    }

    // Delete the calendar event
    await Calendar.findByIdAndDelete(id);

    // Step 5: Respond with a success message if the deletion is successful
    res.json({ message: "Calendar event deleted successfully" });
});

const CalendarMethods = {
    fetchCalendar,
    ceateDateCalender,
    updateDateCalender,
    DeleteDateCalender,
};

export default CalendarMethods;