import React from 'react';
import '../css/weekContainer.css'
import '../css/owfont-regular.css'
import { IDataList } from "../models"

interface DataProps {
    list: IDataList
}

export const WeekContainer = (props: DataProps) => {
    const ms = props.list.dt * 1000
    const weekDayName = new Date(ms).toLocaleString('ru', {weekday: 'long'})
    const dayNumber = new Date(ms).toLocaleString('ru', {month: 'long', day: '2-digit', year: 'numeric'})
    const cardText = props.list.weather[0].description
    const tempNow = Math.round(props.list.main.temp) + ' °C'
    const imgClass = `owf owf-${props.list.weather[0].id} owf-4x icon`

    return (
        <div className="weekContainer">
            <div className="weekDayName">{weekDayName}</div>
            <div className="dayNumber">{dayNumber}</div>
            <i className={imgClass}/>
            <div className="temp">{tempNow}</div>
            <div className="descripion">{cardText}</div>
        </div>
    )
}