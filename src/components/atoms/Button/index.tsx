import classNames from "classnames";
import { IButtonProps } from "utils/interfaces";
import "./index.scss"

export const Button = ({ onClick, className, label, type }: IButtonProps) => {
    return (
        <button className={classNames("btn", className, `btn-${type}`)} onClick={onClick}>{label}</button>
    )
}