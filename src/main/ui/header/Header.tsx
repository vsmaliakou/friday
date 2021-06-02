import React from "react";
import style from './Header.module.css'
import {forgot, login, newPassword, profile, registration, test} from "../common/links";
import {packList} from "../common/links";

export const Header = () => {
    return (
        <div className={style.header}>
            {login}
            {registration}
            {forgot}
            {newPassword}
            {profile}
            {test}
            {packList}
        </div>
    )
}