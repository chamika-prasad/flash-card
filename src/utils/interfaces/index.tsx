import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface ITypographyProps {
    label: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    className?: string;
}

export interface ITypography {
    [key: string]: string | any;
}

export interface IButtonProps {
    onClick: () => void;
    label: string;
    className?: string;
    type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link"|"default";
}

export interface INavBarProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export interface IInputProps {
    placeHolder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface ITextAreaProps {
    placeHolder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface IFlashCardProps{
    title:string;
    description:string;
    onClick:()=>void;
}
