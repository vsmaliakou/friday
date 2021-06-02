import React from "react";
import style from './Header.module.css'
import {cards, forgot, login, packs, profile, registration, test} from "../common/links";

export const Header = () => {
    return (
        <div className={style.header}>
            {login}
            {registration}
            {forgot}
            {profile}
            {test}
            {packs}
            {cards}
        </div>
    )
}