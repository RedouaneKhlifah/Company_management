import mongoose from "mongoose";

const CalendarSchema = mongoose.Schema(
    {
        start: {
            type: Date,
            required: [true, "please fill the start date"]
        },
        end: {
            type: Date,
            required: [true, "please fill the end date "]
        },
        title: {
            type: String,
            required: [true, "please fill the title"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "personne"
        }

    },
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;