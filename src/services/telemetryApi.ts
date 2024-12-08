import { getToken } from "utils/functions";
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
                    Authorization: `bearer ${getToken()}`,
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { flashCardId, action, startAt,endAt }, // Pass the payload dynamically
            }),
        }),

    })
})

export const { useAddTelemetryMutation } = telemetryApis;