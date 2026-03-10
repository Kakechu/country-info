import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({city, lat, lng}) => {
    const [weatherData, setWeatherData] = useState(null)


    useEffect(() => {
        if (!lat || !lng) {
            return
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`


        const fetchWeather = async () => {
            try {
                const response = await axios.get(url)
                setWeatherData(response.data)
                } catch (error) {
                    console.log("error:", error)
                }
        }

        fetchWeather()

    }, [lat, lng])

    if (!weatherData) {
        return <p>Loading weather...</p>
    }

    console.log(weatherData)
    const {current_weather, daily} = weatherData
    const windspeed = (current_weather.windspeed / 3.6).toFixed(1)

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>temperature {current_weather.temperature} °C</p>
            <p>wind {windspeed} m/s</p>
            <p>max {daily.temperature_2m_max[0]} °C</p>
            <p>min {daily.temperature_2m_min[0]} °C</p>            
        </div>
    )
}

export default Weather