import { baseApi } from "./api";

const telemetryApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addTelemetry: builder.mutation<any, {
            flashCardId: string | undefined,
            action: "view" | "resolve",
            startAt: Date | null,
            endAt: Date
        }>({
            query: ({ flashCardId, action, startAt,endAt }) => ({
                url: "/telemetry",
                method: "POST",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { flashCardId, action, startAt,endAt }, // Pass the payload dynamically
            }),
        }),

    })
})

export const { useAddTelemetryMutation } = telemetryApis;