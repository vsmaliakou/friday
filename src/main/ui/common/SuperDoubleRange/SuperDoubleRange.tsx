import React, {ChangeEvent, useState} from 'react'
import {Slider} from "@material-ui/core";
import s from './SuperRange.module.css'
import {useDispatch} from "react-redux";
import {getCardsPacksTC, setMinMaxValueAC} from "../../../bll/reducers/cardsPacks-reducer";

type SuperDoubleRangePropsType = {}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = () => {

    const dispatch = useDispatch()

    const [value, setValue] = useState<number[]>([0, 100])
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[])
        dispatch(setMinMaxValueAC(newValue as number[]))
        dispatch(getCardsPacksTC())
    };

    return (
        <span className={s.range}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={1}
            />
        </span>
    )
}

export default SuperDoubleRange
