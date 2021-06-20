import React from 'react';
import s from './RatingCard.module.scss'
import {Rating} from "@material-ui/lab";

const RatingCard = () => {

    return (
        <div className={s.wrap}>
            
            <Rating/>
                
        </div>
       
    )
}
export default RatingCard

