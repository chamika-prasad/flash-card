import { baseApi } from "./api";

const flashCardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFlashCardCategory: builder.mutation<any, { name: string; description: string; }>({
            query: ({ name, description }) => ({
                url: "/flashcards/categories",
                method: "POST",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { name, description }, // Pass the payload dynamically
            }),
        }),
        getFlashCardSets: builder.query<any, void>({
            query: () => ({
                url: "/flashcards/categories",
                method: "Get",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY"
                }
            })
        }),
        getFlashCards: builder.query<any, string>({
            query: (id) => ({
                url: `/flashcards/${id}`,
                method: "GET",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                },
            }),
        }),
        addFlashCard: builder.mutation<any, { question: string; answer: string; categoryId: string | undefined }>({
            query: ({ question, answer, categoryId }) => ({
                url: "/flashcards",
                method: "POST",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { question, answer, categoryId }, // Pass the payload dynamically
            }),
        }),
        getFlashCardSetById: builder.query<any, string>({
            query: (id) => ({
                url: `/flashcards/categories/${id}`,
                method: "GET",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                },
            }),
        }),
        addRating: builder.mutation<any, { flash_card_set_id:string|undefined, description:string,rating:number }>({
            query: ({ flash_card_set_id, description, rating }) => ({
                url: "/flashcards/rating",
                method: "POST",
                headers: {
                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzc3OWM5LWIzMzktMTFlZi1hYmNmLWNjMjhhYThjZWNkNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzM1Njc4MjEsImV4cCI6MTczMzU4NTgyMX0.ENNvSYmmVNmObBS8yznWqy7kkO-uK3RpNE6WlCydStY",
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { flash_card_set_id, description, rating }, // Pass the payload dynamically
            }),
        }),
    })
})

export const { useGetFlashCardSetsQuery, useGetFlashCardsQuery, useAddFlashCardMutation, useAddFlashCardCategoryMutation, useGetFlashCardSetByIdQuery,useAddRatingMutation } = flashCardApis;