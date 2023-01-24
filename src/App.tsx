import React from "react";
import {useState} from "react";
import axios from "axios";
import { WeekContainer } from "./Components/WeekContainer";
import './App.css'
import { IData, IDataList } from "./models";

const api: {key: string; url: string} = {
  key: '65fdf2698bc46edde145bb0b8b52cbf8',
  url: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {
  const [city, setCity] = useState('')
  const [weatherMorning, setWeatherMorning] = useState<IDataList[]>([])
  const [weatherDaytime, setWeatherDaytime] = useState<IDataList[]>([])
  const [weatherEvening, setWeatherEvening] = useState<IDataList[]>([])

  const validate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    
    e.target.value = e.target.value.replace(/[0-9]/g, '')
    
  }
  const clearData = () => {
    setCity('')
  }

  const search: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      const fetchData = async() => {
        
        const response = await axios.get<IData>(`${api.url}forecast?q=${event.currentTarget.value}&lang=ru&units=metric&APPID=${api.key}`)
        setCity(response.data.city.name)
        setWeatherMorning(response.data.list.filter(read => read.dt_txt.includes('06:00:00')))
        setWeatherDaytime(response.data.list.filter(read => read.dt_txt.includes('12:00:00')))
        setWeatherEvening(response.data.list.filter(read => read.dt_txt.includes('18:00:00')))
      }
      fetchData()
    }
  }
  
  return (
    <React.Fragment>
        <div className="head">
          Прогноз погоды
        </div>
        <input className="inputcity"
          type='text'
          placeholder='Введите город и нажмите Enter...'
          onKeyDown={search}
          onInput={validate}
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button
          className="button"
          onClick={clearData}
          >Очистить
        </button>
        <div className='App'>
          <div className="morning">Утро</div>
          {weatherMorning.map(list => <WeekContainer list={list}/>)}
          <div className="day">День</div>
          {weatherDaytime.map(list => <WeekContainer list={list}/>)}
          <div className="evening">Вечер</div>
          {weatherEvening.map(list => <WeekContainer list={list}/>)}
        </div>
      </React.Fragment>
  )
}

export default App;
