import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

type WeatherProps = {
  city: string
  lat?: number
  lng?: number
}

type WeatherData = {
  current_weather: {
    temperature: number
    windspeed: number
    weathercode: number
  }
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky'
  if (code <= 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code >= 45 && code <= 48) return 'Fog'
  if (code >= 51 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code >= 95) return 'Thunderstorm'

  return 'Unknown weather'
}

const Weather = ({ city, lat, lng }: WeatherProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (lat == null || lng == null) {
      return
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`

    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(url)
        setWeatherData(response.data)
      } catch (error) {
        console.log('error:', error)
      }
    }

    fetchWeather()
  }, [lat, lng])

  if (!weatherData) {
    return <Typography>Loading weather...</Typography>
  }

  const { current_weather, daily } = weatherData
  const windspeed = (current_weather.windspeed / 3.6).toFixed(1)
  const weatherDescription = getWeatherDescription(current_weather.weathercode)

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Weather in {city}
      </Typography>

      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="subtitle1">{weatherDescription}</Typography>
        <Typography variant="h5">{current_weather.temperature} °C</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2">Wind {windspeed} m/s</Typography>
        <Typography variant="body2">Max {daily.temperature_2m_max[0]} °C</Typography>
        <Typography variant="body2">Min {daily.temperature_2m_min[0]} °C</Typography>
      </Box>
    </Box>
  )
}

export default Weather
