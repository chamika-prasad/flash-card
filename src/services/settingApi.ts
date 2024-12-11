import { getToken } from "utils/functions";
import { baseApi } from "./api";

const settingApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateLimit: builder.mutation<any, { limit: number; }>({
            query: ({ limit }) => ({
                url: "/setting",
                method: "PUT",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { limit },
                // Pass the payload dynamically
            }),
        }),
        getLimit: builder.query<any, void>({
            query: () => ({
                url: "/setting",
                method: "Get",
                headers: {
                    Authorization: `bearer ${getToken()}`
                }
            })
        })
    })
})

export const { useUpdateLimitMutation,useGetLimitQuery } = settingApis;