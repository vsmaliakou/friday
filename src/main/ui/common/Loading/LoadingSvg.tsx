import React from 'react';
import s from './LoadingSvg.module.scss'

export const LoadingSvg = () => {
    return (
        <div className={s.loadingWrap}>
            <div className={s.cssloadDots}>
                <div className={s.cssloadDot}></div>
                <div className={s.cssloadDot}></div>
                <div className={s.cssloadDot}></div>
                <div className={s.cssloadDot}></div>
                <div className={s.cssloadDot}></div>
            </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7" result="goo" ></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix" ></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}