import { apiSlice } from "./apiSlice";

const USER_URL = "/api/calendar";

export const calendarApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createCalendar : builder.mutation ({
        query : (data) => ({
            url : USER_URL ,
            method : "POST",
            body : data
        })
        }),
        getCalendarDates : builder.mutation({
            query : ()=>({
                url : USER_URL ,
                method : "GET", 
            })
        }),
        updateCalendarDate: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PATCH",
                body: data
            })
        }),
        deleteCalenderDate : builder.mutation({
            query : (data) => ({
                url :  `${USER_URL}/${data.id}`,
                method : "DELETE"
            })
        })
        

    })
})

export const {
    useCreateCalendarMutation,
    useGetCalendarDatesMutation,
    useUpdateCalendarDateMutation,
    useDeleteCalenderDateMutation,
} = calendarApiSlice