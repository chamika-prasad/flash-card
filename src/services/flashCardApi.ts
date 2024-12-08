import { getToken } from "utils/functions";
import { baseApi } from "./api";

const flashCardApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFlashCardCategory: builder.mutation<any, { name: string; description: string; }>({
            query: ({ name, description }) => ({
                url: "/flashcards/categories",
                method: "POST",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { name, description },
                // Pass the payload dynamically
            }),
        }),
        getFlashCardSets: builder.query<any, void>({
            query: () => ({
                url: "/flashcards/categories",
                method: "Get",
                headers: {
                    Authorization: `bearer ${getToken()}`
                }
            })
        }),
        getFlashCards: builder.query<any, string>({
            query: (id) => ({
                url: `/flashcards/${id}`,
                method: "GET",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                },
            }),
        }),
        addFlashCard: builder.mutation<any, { question: string; answer: string; categoryId: string | undefined }>({
            query: ({ question, answer, categoryId }) => ({
                url: "/flashcards",
                method: "POST",
                headers: {
                    Authorization: `bearer ${getToken()}`,
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
                    Authorization: `bearer ${getToken()}`,
                },
            }),
        }),
        addRating: builder.mutation<any, { flash_card_set_id: string | undefined, description: string, rating: number }>({
            query: ({ flash_card_set_id, description, rating }) => ({
                url: "/flashcards/rating",
                method: "POST",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { flash_card_set_id, description, rating }, // Pass the payload dynamically
            }),
        }),
        getRatingBySetId: builder.query<any, string>({
            query: (id) => ({
                url: `/flashcards/get-rating/${id}`,
                method: "GET",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                },
            }),
        }),
        addHideItem: builder.mutation<any, { flashCardId: string | undefined }>({
            query: ({ flashCardId }) => ({
                url: "/flashcards/hide",
                method: "POST",
                headers: {
                    Authorization: `bearer ${getToken()}`,
                    "Content-Type": "application/json", // Ensure the payload is sent as JSON
                },
                body: { flashCardId }, // Pass the payload dynamically
            }),
        }),
    })
})

export const { useGetFlashCardSetsQuery, useGetFlashCardsQuery, useAddFlashCardMutation, useAddFlashCardCategoryMutation, useGetFlashCardSetByIdQuery, useAddRatingMutation, useGetRatingBySetIdQuery, useAddHideItemMutation } = flashCardApis;