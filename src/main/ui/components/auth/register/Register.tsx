import React, {ChangeEvent} from 'react';
import s from './Register.module.scss';
import logo from './../../../../../assets/img/logo.png';
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";

type RegisterPropsType = {
    error: string
    isChecked: boolean
    onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void
    onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeSecondPassword: (e: ChangeEvent<HTMLInputElement>) => void
    viewPassword: () => void
    closeRegister: () => void
    onSubmit: () => void
}

export const Register: React.FC<RegisterPropsType> = (props) => {
    return (
        <div className={s.reg}>
           <div className={s.card}>
                <img className={s.logo} src={logo} alt="logo"/>

                <h2 className={s.title}>Sign Up</h2>

                <form className={s.form}>

                    {props.error && <span>{props.error}</span>}
                    <SuperInputText
                        type={"email"}
                        setError={x => x}
                        onChange={props.onChangeEmail}
                        label={"Email"}
                    />
                    <SuperInputText
                        type={props.isChecked ? "text" : "password"}
                        setError={x => x}
                        onChange={props.onChangePassword}
                        label={"Password"}
                    />
                    <SuperInputText
                        type={props.isChecked ? "text" : "password"}
                        setError={x => x}
                        onChange={props.onChangeSecondPassword}
                        label={"Confirm password"}
                    />
                    <span onClick={props.viewPassword}>View password</span>

                    <div className={s.btnWrap}>

                        <SuperButton className={s.cancel} onClick={props.closeRegister}>Cancel</SuperButton>
                        <SuperButton className={s.register} onClick={props.onSubmit}>Sign up</SuperButton>

                    </div>

                </form>

            </div>
        </div>
    )
}