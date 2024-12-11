import classNames from "classnames";
import { ChangeEvent, forwardRef } from "react";
import { IInputProps } from "utils/interfaces";

export const Input = ({ placeHolder, value, onChange, className,onBlur,onFocus,type="text" }: IInputProps) => {
    return (
        <input className={classNames("input",className)} placeholder={placeHolder} type={type} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
    )
}

