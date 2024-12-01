import classNames from "classnames";
import { ChangeEvent, forwardRef } from "react";
import { IInputProps } from "utils/interfaces";

export const Input = ({ placeHolder, value, onChange, className,onBlur,onFocus }: IInputProps) => {
    return (
        <input className={classNames(className)} placeholder={placeHolder} type="text" value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
    )
}

