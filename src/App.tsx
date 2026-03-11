import { useState, useEffect, type ChangeEvent } from 'react'
import axios from 'axios'
import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import type { Country } from './types/country'
import { Alert, Box, Typography } from '@mui/material'

const BASEURL =
  'https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,languages,flags,capitalInfo,population'

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchWord, setSearchWord] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value)
    setSelectedCountry(null)
  }

  // Get all countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get<Country[]>(BASEURL)
        setCountries(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setError('Failed to fetch countries. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCountries()
  }, [])

  // Filtering the countries based on the search word
  const normalizedSearch = searchWord.trim().toLowerCase()

  const filteredCountries = normalizedSearch
    ? countries.filter((country) => country.name.common.toLowerCase().includes(normalizedSearch))
    : []

  const tooManyMatches = filteredCountries.length > 10

  const countryNamesToShow =
    !tooManyMatches && filteredCountries.length > 1
      ? filteredCountries.map((country) => country.name.common)
      : []

  const autoSelectedCountry = filteredCountries.length === 1 ? filteredCountries[0] : null

  const manuallySelectedCountry = selectedCountry
    ? countries.find((c) => c.name.common === selectedCountry) || null
    : null

  const activeCountryDetails = manuallySelectedCountry || autoSelectedCountry

  const shouldShowList = !tooManyMatches && !selectedCountry && countryNamesToShow.length > 1

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Country info
      </Typography>

      <CountryForm value={searchWord} onChange={handleSearchWordChange} />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {isLoading && !error && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading countries...
        </Typography>
      )}
      {tooManyMatches && <Alert severity="info"> Too many matches</Alert>}
      {shouldShowList && (
        <CountryList countriesToShow={countryNamesToShow} setSelectedCountry={setSelectedCountry} />
      )}

      {activeCountryDetails && (
        <CountryDetails
          countryDetails={activeCountryDetails}
          onBackToList={selectedCountry ? () => setSelectedCountry(null) : undefined}
        />
      )}
    </Box>
  )
}

export default App
