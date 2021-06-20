import React from 'react';
import s from './_RatingCard.module.scss'
import {Rating} from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles({
    root: {
        color: "#3040ce",
        fontSize: "17px"
    }
})

const RatingCard = () => {

    const classes = style()

    return (
        
            
            <Rating className={classes.root} defaultValue={2.5} precision={0.5} />
                
       
       
    )
}
export default RatingCard

