import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
    })
});

export const { useLoginMutation } = usersApiSlice;
