import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.FC<DefaultButtonPropsType> = ({className, ...restProps}) => {
    return (
        <button
            className={className}
            {...restProps}
        />
    );
}

export default Button;