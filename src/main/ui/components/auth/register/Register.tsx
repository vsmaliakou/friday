import React, {ChangeEvent} from 'react';
import style from './RegisterPage_vit.module.css'
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {login} from "../../../common/links";

type RegisterPropsType = {
    onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void
    onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

export const Register: React.FC<RegisterPropsType> = ({onChangeEmail, onChangePassword, onSubmit}) => {

    return (
        <div className={style.registerPage}>
            <div>
                <SuperInputText placeholder="email" type={"email"} setError={x => x} onChange={onChangeEmail}/>
            </div>
            <div>
                <SuperInputText placeholder="password" type={"password"} setError={x => x} onChange={onChangePassword}/>
            </div>
            <div>
                <SuperButton>cancel</SuperButton>
                <SuperButton onClick={onSubmit}>sign up</SuperButton>
            </div>
            {login}
        </div>
    )
}