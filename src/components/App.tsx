import { CitySearcher } from './CitySearcher'
import { Title } from './Title'
import { useState } from 'react'
import { CityList } from './CityList'
import { WeatherInfo } from './WeatherInfo'

import { City } from '../types/City'
import { Weather } from '../types/Weather'

import { getCitiesFromAPI, getWeatherPerCity } from '../api/openWeatherAPI'

export const App = () => {
  const [searchResults, setResults] = useState([] as City[])
  const [weatherInfo, setWeatherInfo] = useState<Weather | undefined>(undefined)
  const [historial, setHistorial] = useState([] as City[])
  const [isListVisible, setListVisibility] = useState(false)
  const [isHistorialVisible, setHistorialVisibility] = useState(false)

  const showHistorial = () => {
    setHistorial(searchResults)
    setHistorialVisibility(true)
  }

  const showCityList = (searchTerm: string) => {
    getCitiesFromAPI(searchTerm).then(setResults)
    setListVisibility(true)
  }

  const hideCityList = () => {
    setListVisibility(false)
  }

  const hideHistorial = () => {
    setHistorialVisibility(false)
  }

  const onCitySelection = (city: City) => {
    getWeatherPerCity(city).then(setWeatherInfo)
  }

  return (
    <>
      <Title />
      <CitySearcher onSearch={showCityList} onHistorialRequest={showHistorial} />
      <CityList
        cities={searchResults}
        isVisible={isListVisible}
        onClose={hideCityList}
        onCitySelection={onCitySelection}
      />
      <CityList
        cities={historial}
        isVisible={isHistorialVisible}
        onClose={hideHistorial}
        onCitySelection={onCitySelection}
      />
      <WeatherInfo weather={weatherInfo} />
    </>
  )
}
