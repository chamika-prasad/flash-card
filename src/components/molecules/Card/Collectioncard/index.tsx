import { Typography } from "components/atoms/Typography"
import { IFlashCardSetProps } from "utils/interfaces";
import "./index.scss";


export const Collectioncard = ({ item,onClick }: IFlashCardSetProps) => {
    return (
        <div className="collection-card-wrapper-1" onClick={onClick}>
            <div className="collection-card-wrapper-2">
                <div className="collection-card-wrapper">
                    <Typography variant="h3" label={item.name} className="collection-card-title" />
                    <Typography variant="p" label={item.description} className="collection-card-description" />
                </div>
            </div>
        </div>
    )
}