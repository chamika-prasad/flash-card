import classNames from "classnames";
import { ChangeEvent, forwardRef } from "react";
import { ITextAreaProps } from "utils/interfaces";

export const TextArea = ({ placeHolder, value, onChange, className,onBlur,onFocus }: ITextAreaProps) => {
    return (
        <textarea className={classNames(className)} placeholder={placeHolder} value={value} onFocus={onFocus} onBlur={onBlur} onChange={onChange}/>
    )
}

