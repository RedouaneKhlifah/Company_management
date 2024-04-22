import * as React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Schedule({setOpen ,setForm}) {

  const formatDate = (date) => {
    return date.toISOString().substring(0, 10);
  };

  // Function to extract data from event
  const extractEventData = (event) => {
    const range = event._instance.range;
    const title = event._def.title;
    const id = event._def.publicId;
    return { id, strDate: formatDate(range.start), endDate: formatDate(range.end), title };
  };

   // Function to extract data from date click
   const extractDateData = (dateStr) => {
    return {id: null, strDate: formatDate(new Date(dateStr)), endDate: formatDate(new Date(dateStr)) };
  };

  // Function to handle click event
  const handleClick = (data) => {
    setOpen(true);
    const eventData = data.event ? extractEventData(data.event) : null;
    const dateData = data.dateStr ? extractDateData(data.dateStr) : null;

    setForm((prev) => ({
      ...prev,
      ...(eventData || dateData), // Merge eventData or dateData if available
      title: (eventData && eventData.title) || prev.title || "test", // Use title from eventData, or previous state, or default
    }));
  };

 
   
  
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
          // eventClick={(arg)=> console.log( {start : arg.event._instance.range.start , end :arg.event._instance.range.end,title  : arg.event.title   })}
          editable={true}
          droppable  = {true}
          events ={ [
            {
              title: 'All Day Event',
              start: '2024-04-23'
            },
            {
              id : 2,
              title: 'Long Event',
              start: '2024-04-22',
              end: '2024-04-25'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2024-03-09T16:00:00'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2024-03-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2024-03-11',
              end: '2024-03-13'
            },
            {
              title: 'Meeting',
              start: '2024-03-12T10:30:00',
              end: '2024-03-12T12:30:00'
            },
            {
              title: 'Lunch',
              start: '2024-03-12T12:00:00'
            },
            {
              title: 'Meeting',
              start: '2024-03-12T14:30:00'
            },
            {
              title: 'Birthday Party',
              start: '2024-03-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'https://google.com/',
              start: '2024-03-28'
            }
          ]}
        />
      </div>
      )
}

export default Schedule