import React, {ChangeEvent, useState} from 'react'
import {Register} from "./Register";
import {useDispatch} from "react-redux";
import {setRegistrationDataTC} from "../../../../bll/reducers/register-reducer";

export const RegisterContainer = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmit = () => {
        dispatch(setRegistrationDataTC(email, password))
    }

    return (
        <div>
            <h1>Registration</h1>
            <Register
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onSubmit={onSubmit}
            />
        </div>
    )
}