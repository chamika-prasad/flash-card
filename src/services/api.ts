import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["user", "flashCard"],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API }),
    endpoints: () => ({})
});
