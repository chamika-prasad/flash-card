import { baseApi } from "./api";

const userApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation<any, {
            email: string ,
            password: string
        }>({
            query: ({ email, password }) => ({
                url: "/users/register",
                method: "POST",
                body: { email, password }, // Pass the payload dynamically
            }),
        }),
        login: builder.mutation<any, {
            email: string ,
            password: string
        }>({
            query: ({ email, password }) => ({
                url: "/users/login",
                method: "POST",
                body: { email, password }, // Pass the payload dynamically
            }),
        }),

    })
})

export const { useRegisterMutation,useLoginMutation } = userApis;