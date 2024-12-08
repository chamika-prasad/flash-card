export type category = {
    id: string;
    name: string;
    user_id: string;
    description: string;
}

export type flashCard = {
    answer: string;
    flash_card_set_id: string;
    id: string;
    question: string;
    user_id: string;
}

export type telemetry = {
    flashCardId: string|undefined,
    action: "view" | "resolve",
    startAt: Date|null,
    endAt: Date
}

export type ratingType = {
    flash_card_set_id: string|undefined,
    description: string,
    rating: number,
}

export type rating = {
    email: string,
    description: string,
    rating: number,
}

export type error = {
    data: any,
    status: number
}