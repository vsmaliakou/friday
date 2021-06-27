import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./Checkbox.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: React.FC<DefaultInputPropsType> = ({type, onChange, className, children, ...restProps}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
    }

    return (
        <label className={s.SuperCheckboxLabel}>
            <input
                type={"checkbox"}
                onChange={onChangeCallback}
                className={s.finalInputClassName}
                {...restProps}
            />
            <span>Remember me</span>
        </label>
    );
}

export default Checkbox;
