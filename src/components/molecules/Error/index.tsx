import { Typography } from "components/atoms/Typography"
import { IErrorProps, IFlashCardSetProps } from "utils/interfaces";
import "./index.scss";


export const FlashError = ({ label }: IErrorProps) => {
    return (
                <div className="error-wrapper">
                    <Typography variant="h6" label={label} className="error-text" />
                </div>
    )
}