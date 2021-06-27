import React, {ChangeEvent, useState} from 'react'
import {Slider} from "@material-ui/core";
import s from './DoubleRange.module.css'
import {useDispatch} from "react-redux";
import {getCardsPacksTC, setMinMaxValueAC} from "../../../bll/reducers/cardsPacks-reducer";

const DoubleRange = () => {

    const dispatch = useDispatch()

    const [value, setValue] = useState<number[]>([0, 100])

    let delayTimer: any
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        clearTimeout(delayTimer)
        delayTimer = setTimeout(() => {
            setValue(newValue as number[])
            dispatch(setMinMaxValueAC(newValue as number[]))
            dispatch(getCardsPacksTC())
        }, 2000)
    }

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

export default DoubleRange
