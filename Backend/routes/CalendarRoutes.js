import { Router } from "express";
import CalendarMehods from "../controllers/CalendarController.js"

const router = Router();

// @GET
router.get("/", CalendarMehods.fetchCalendar);

// // @POST
router.post("/", CalendarMehods.ceateDateCalender);

// // @PATCH
router.patch("/:id", CalendarMehods.updateDateCalender);

// // @Delete
router.delete("/:id", CalendarMehods.DeleteDateCalender);

export default router;
