import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryForm from './components/CountryForm.jsx'
import CountryList from './components/CountryList.jsx'
import CountryDetails from './components/CountryDetails.jsx'
import { Card } from '@mui/material'


const BASEURL = "https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,languages,flags,capitalInfo"

function App() {
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)


  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
    setSelectedCountry(null)
  }
  
  // Get all countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(BASEURL)
        setCountries(response.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  // Filtering the countries based on the search word
  const normalizedSearch = searchWord.trim().toLowerCase()

  const filteredCountries = normalizedSearch
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(normalizedSearch)
      )
    : []

  const tooManyMatches = filteredCountries.length > 10

  const countryNamesToShow = !tooManyMatches && filteredCountries.length > 1
    ? filteredCountries.map(country => country.name.common)
    : []

  const autoSelectedCountry = filteredCountries.length === 1
    ? filteredCountries[0]
    : null

  const manuallySelectedCountry = selectedCountry
    ? countries.find(c => c.name.common === selectedCountry) || null
    : null

  const activeCountryDetails = manuallySelectedCountry || autoSelectedCountry

  const shouldShowList = !tooManyMatches && !selectedCountry && countryNamesToShow.length > 1



  return (
    <>
      <h1>Country info</h1>
      <CountryForm value={searchWord} onChange={handleSearchWordChange} />
      {tooManyMatches && <div> Too many matches</div>}
      {shouldShowList && (
        <CountryList
          countriesToShow={countryNamesToShow}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      {activeCountryDetails && (
        <CountryDetails countryDetails={activeCountryDetails} />
      )}

    </>
  
  )
}

export default App

