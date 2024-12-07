import { Typography } from "components/atoms/Typography"
import { IErrorProps, IFlashCardSetProps } from "utils/interfaces";
import { Star } from "lucide-react";
import "./index.scss";
import { ChangeEvent, useState } from "react";
import { Button } from "components/atoms/Button";
import { TextArea } from "components/atoms/TextArea/input";
import { useAddRatingMutation } from "services/flashCardApi";
import { ratingType } from "utils/types";

interface Iprops {
    setId: string|undefined;
}

export const ReviewComponent = ({ setId }: Iprops) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [addRating, { isLoading, isError, isSuccess }] = useAddRatingMutation();

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleStarHover = (hoveredStar: number) => {
        setHoveredRating(hoveredStar);
    };

    const handleSubmit = async () => {
        if (rating > 0) {


            let ratingItem: ratingType = {
                flash_card_set_id: setId,
                description: comment,
                rating: rating,
            }

            try {
                const response = await addRating(ratingItem).unwrap();
            } catch (error) {
                console.error("Error adding flashcard:", error);
            }


            setRating(0);
            setComment('');
            setHoveredRating(0);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const primaryColor = '#3b82f6'
    const accentColor = '#10b981'

    const starStyles = {
        '--primary-color': primaryColor,
        '--accent-color': accentColor
    } as React.CSSProperties;
    return (
        <div className="review-container" style={starStyles}>
            <div className="review-card">
                <div className="review-header">
                    <Typography label="Add Your Review" variant="h2" />
                </div>

                <div className="star-rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={36}
                            className={`star-icon ${star <= (hoveredRating || rating) ? "star-filled" : ''
                                }`}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => handleStarClick(star)}
                        />
                    ))}
                </div>

                <div className="rating-feedback">
                    {rating > 0
                        ? `You rated this ${rating} out of 5 stars`
                        : 'Please select a rating'}
                </div>

                <div className="comment-section">
                    <TextArea
                        placeHolder="Write your review here (optional)"
                        value={comment}
                        onChange={handleChange}
                        className={"comment-textarea"}
                    />
                </div>

                <div className="submit-section">
                    <Button
                        onClick={handleSubmit}
                        className="submit-button"
                        isDisable={rating === 0}
                        label=" Submit Review" />


                </div>
            </div>
        </div>
    )
}