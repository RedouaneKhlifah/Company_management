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
        userProfile: builder.mutation({
            query: () => ({
                url: `${USER_URL}/profile`,
                method: "GET"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST"
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/forgot-password`,
                method: "POST",
                body: data
            })
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/admin`,
                method: "POST",
                body: data
            })
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useUserProfileMutation,
    useCreateEmployeeMutation
} = usersApiSlice;
