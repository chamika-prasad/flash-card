import { Typography } from "components/atoms/Typography"
import { IFlashCardProps } from "utils/interfaces";
import "./index.scss";


export const Collectioncard = ({ title, description,onClick }: IFlashCardProps) => {
    return (
        <div className="collection-card-wrapper-1" onClick={onClick}>
            <div className="collection-card-wrapper-2">
                <div className="collection-card-wrapper">
                    <Typography variant="h3" label="title" className="collection-card-title" />
                    <Typography variant="p" label="description" className="collection-card-description" />
                </div>
            </div>
        </div>
    )
}