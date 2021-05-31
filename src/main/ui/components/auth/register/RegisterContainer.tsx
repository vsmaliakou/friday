import React, {ChangeEvent, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setErrorAC, setRegistrationDataTC} from "../../../../bll/reducers/register-reducer";
import style from "./RegisterPage_vit.module.css";
import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {AppRootStateType} from "../../../../bll/store";
import {Redirect, useHistory} from "react-router-dom";

export const RegisterContainer = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const [isChecked, setIsChek] = useState(false)

    const error = useSelector<AppRootStateType, string>(state => state.register.error)
    const registrationSuccess = useSelector<AppRootStateType>(state => state.register.registrationSuccess)

    const dispatch = useDispatch()
    const history = useHistory()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeSecondPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondPassword(e.currentTarget.value)
    }
    const viewPassword = () => {
        setIsChek(!isChecked)
    }
    const closeRegister = () => {
        history.push('/login')
    }

    if(registrationSuccess){
        return <Redirect to='/login'/>
    }

    const onSubmit = () => {
        if(password === secondPassword){
            dispatch(setRegistrationDataTC(email, password))
        }else if(!secondPassword){
            dispatch(setErrorAC("Please fill in the confirm password field"))
        }else{
            dispatch(setErrorAC("Passwords don't match"))
        }
    }

    return (
        <div className={style.registerPage}>
            {/*<div>*/}
            {/*    <SuperInputText placeholder="email" type={"email"} setError={x => x} onChange={onChangeEmail}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <SuperInputText placeholder="password" type={isChecked ? "text" : "password"} setError={x => x} onChange={onChangePassword}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <SuperInputText placeholder="confirm password" type={isChecked ? "text" : "password"} setError={x => x} onChange={onChangeSecondPassword}/>*/}

            {/*</div>*/}
            <input type="checkbox" onClick={viewPassword}/>view password
            <div>
                <SuperButton onClick={closeRegister}>cancel</SuperButton>
                <SuperButton onClick={onSubmit}>sign up</SuperButton>
            </div>
            {error && <div>{error}</div>}
        </div>
    )
}
