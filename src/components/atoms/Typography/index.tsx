import classNames from "classnames";
import { ITypography, ITypographyProps } from "utils/interfaces";
import "./index.scss"

const variantMapping: ITypography = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
}

export const Typography = ({ label, variant,className }: ITypographyProps) => {
    const Component = variantMapping[variant];
    return (
        <Component className={classNames("typography",className)}>
            {label}
        </Component>
    );
}