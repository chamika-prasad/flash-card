import { Typography } from "components/atoms/Typography"
import { IFlashCardProps } from "utils/interfaces";
import "./index.scss";

export const Flashcard = ({ title, description,onClick }: IFlashCardProps) => {
    return (
                <div className="flash-card-wrapper" onClick={onClick}>
                    <Typography variant="h3" label="title" className="flash-card-title" />
                    <Typography variant="p" label="description" className="flash-card-description" />
                </div>
    )
}