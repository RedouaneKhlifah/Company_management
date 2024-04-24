import * as React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addDay } from '../../utils/dateFormator';
import { useEffect ,useState } from 'react';
import {useSelector } from 'react-redux';
import useFetchCalendarData from '../../utils/calendarApiMethods';

function Schedule({setOpen ,setForm}) {

  const {calendarDates} = useSelector((state)=>state.calendar)
    useFetchCalendarData()
  
  ////  hundel click on calender  ///

  // Function to extract data from event
  const extractEventData = (event) => {
    const range = event._instance.range;
    const title = event._def.title;
    const id = event._def.publicId;
    return { id, start: range.start, end: range.end, title };
  };
   // Function to extract data from date click
   const extractDateData = (dateStr) => {
    return {id: null, start: dateStr, end: addDay(dateStr) };
  };

  // Function to handle click event
  const handleClick = (data) => {
    setOpen(true);
    const eventData = data.event ? extractEventData(data.event) : null;
    const dateData = data.date ? extractDateData(data.date) : null;

    setForm((prev) => ({
      ...prev,
      ...(eventData || dateData), // Merge eventData or dateData if available
      title: (eventData && eventData.title) || prev.title || "", // Use title from eventData, or previous state, or default
    }));
  };
  // fill this fuction to backend to chnage it buy id 
  const handleEventChange = (arg)=>{
    console.log(arg);
  }
  
      return (
        <div>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          height={"80vh"}
          eventClick={(arg)=> handleClick(arg)}
          dateClick={(arg)=> handleClick(arg)}
          eventChange={(arg) => handleEventChange(arg)}

          editable={true}
          droppable  = {true}
          events ={calendarDates}
        />
    

 
      </div>
      )
}

export default Schedule