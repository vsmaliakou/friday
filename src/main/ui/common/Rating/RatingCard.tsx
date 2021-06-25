import React, {ChangeEvent, useEffect, useState} from 'react';
import {Rating} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from "react-redux";
import {changeGradeCardTC} from '../../../bll/reducers/cards-reducer';

const style = makeStyles({
    root: {
        color: "#3040ce",
        fontSize: "17px"
    }
})

type RatingCardType = {
    card_id: string
    grade: number
}

const RatingCard: React.FC<RatingCardType> = props => {

    const {card_id, grade} = props
    const classes = style()
    const dispatch = useDispatch()

    const setNewGradeForCard = (e: ChangeEvent<{}>, value: number | null) => {
        dispatch(changeGradeCardTC(card_id, value))
    }

    // useEffect(() => {
    //     dispatch(changeGradeCard(card_id, grade))
    // })

    return (
        <Rating className={classes.root}
                defaultValue={grade}
                precision={0.5}
                onChange={setNewGradeForCard}
        />
    )
}
export default RatingCard

