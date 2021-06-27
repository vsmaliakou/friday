import React, {ChangeEvent} from 'react';
import s from './Register.module.scss';
import logo from './../../../../../assets/img/logo.png';
import InputText from "../../../common/InputText/InputText";
import Button from "../../../common/Button/Button";
import {RequestStatusType} from '../../../../bll/reducers/app-reduser';
import {LoadingSvg} from '../../../common/Loading/LoadingSvg';

type RegisterPropsType = {
    error: string
    requestStatus: RequestStatusType
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
                    {props.error && <span className={s.error}>{props.error}</span>}
                    {props.requestStatus === "loading" && <LoadingSvg/>}
                    <InputText
                        type={"email"}
                        onChange={props.onChangeEmail}
                        label={"Email"}
                    />
                    <InputText
                        type={props.isChecked ? "text" : "password"}
                        onChange={props.onChangePassword}
                        label={"Password"}
                    />
                    <InputText
                        type={props.isChecked ? "text" : "password"}
                        onChange={props.onChangeSecondPassword}
                        label={"Confirm password"}
                    />
                    <span className={s.view} onClick={props.viewPassword}>View password</span>
                    <div className={s.btnWrap}>
                        <Button className={s.cancel} onClick={props.closeRegister}>Cancel</Button>
                        <Button className={s.register} onClick={props.onSubmit}>Sign up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}