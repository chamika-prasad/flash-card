import { Typography } from "components/atoms/Typography"
import { IFlashCardProps } from "utils/interfaces";
import "./index.scss";

export const Flashcard = ({ item, onClick }: IFlashCardProps) => {
    return (
        <div className="flash-card-wrapper" onClick={onClick}>
            {/* <Typography variant="h3" label={item.} className="flash-card-title" /> */}
            <Typography variant="p" label={item.question} className="flash-card-description" />
        </div>
    )
}