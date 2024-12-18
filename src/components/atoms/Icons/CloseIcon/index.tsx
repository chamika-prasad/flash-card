import classNames from "classnames";

interface IProps {
    className?: string;
    onClick?: () => void;
}

export const CloseIcon = ({ className, onClick }: IProps) => {
    return (
        <div className={classNames("close-icon-wrapper", className)} onClick={onClick} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6.40156 18.6496L5.35156 17.5996L10.9516 11.9996L5.35156 6.39961L6.40156 5.34961L12.0016 10.9496L17.6016 5.34961L18.6516 6.39961L13.0516 11.9996L18.6516 17.5996L17.6016 18.6496L12.0016 13.0496L6.40156 18.6496Z" fill="black" />
            </svg>
        </div >
    )
};