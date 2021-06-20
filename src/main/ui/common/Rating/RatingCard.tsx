
import s from './RatingCard.module.scss'
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const style = makeStyles({    
    root: {                                     
        color: "#3040ce",
        
    }

})


const RatingCard = () => {

    const classes = style()

    return (
        
            
            <Rating className={classes.root} size="small" defaultValue={2.5} precision={0.5} />
                
        
       
    )
}
export default RatingCard

