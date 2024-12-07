import classNames from "classnames";
import { IButtonProps } from "utils/interfaces";
import loadingSvg from "assets/loading.gif";
import "./index.scss"

export const Button = ({ onClick, className, label, type, isLoading = false, isDisable = false }: IButtonProps) => {
    return (
        <button className={classNames("btn", className, `btn-${isDisable ? "default" : type}`)} onClick={onClick} disabled={isDisable}>
            {isLoading ? <img src={loadingSvg} alt="" /> : null}
            {label}
        </button>
    )
}