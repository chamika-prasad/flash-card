import classNames from "classnames";
import { ICheckBox } from "utils/interfaces";

export const CheckBox = ({ value, onChange, className }: ICheckBox) => {
    return (
        <input className={classNames(className)} type="checkbox" checked={value} onChange={onChange} />
    )
}

