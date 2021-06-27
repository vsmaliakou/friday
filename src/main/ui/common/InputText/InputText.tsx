import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./InputText.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    label?: string
};

const InputText: React.FC<SuperInputTextPropsType> = ({type, onChange, label, ...restProps}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
    }
    return (
        <div className={s.wrap}>
            <input
                type={type}
                onChange={onChangeCallback}
                {...restProps}
            />
            <label className={s.label}>{label}</label>
        </div>
    );
}

export default InputText;