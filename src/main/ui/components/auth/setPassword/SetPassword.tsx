import React, {ChangeEvent} from 'react';
import s from './SetPassword.module.scss';
import logo from './../../../../../assets/img/logo.png';
import InputText from "../../../common/InputText/InputText";
import Button from "../../../common/Button/Button";
import {RequestStatusType} from "../../../../bll/reducers/app-reduser";

type SetPasswordType = {
    error: string
    isChecked: boolean
    requestStatus: RequestStatusType
    onChangeNewPassword: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    viewPassword: () => void
}


export const SetPassword: React.FC<SetPasswordType> = ({
                                                           error,
                                                           isChecked,
                                                           requestStatus,
                                                           onChangeNewPassword,
                                                           onSubmit,
                                                           viewPassword
                                                       }) => {
    return (
        <div className={s.set}>
            <div className={s.card}>
                <img className={s.logo} src={logo} alt="logo"/>
                <h2 className={s.title}>Create new password</h2>
                <form className={s.form}>
                    {error && <span>{error}</span>}
                    {requestStatus === "loading" && <span>loading...</span>}
                    <InputText
                        type={isChecked ? "text" : "password"}
                        onChange={onChangeNewPassword}
                        label={"Password"}
                    />
                    <span onClick={viewPassword}>View password</span>
                    <span className={s.text}>
                        Create new password and we will send you further instructions to email
                    </span>
                    <Button
                        className={s.Btn}
                        onClick={onSubmit}
                    >Create new password</Button>
                </form>
            </div>
        </div>
    )
}