import Weather from './Weather'
import type { Country } from '../types/country'

type CountryDetailsProps = {
    countryDetails: Country
}

const CountryDetails = ({ countryDetails }: CountryDetailsProps) => {
    const lat = countryDetails.capitalInfo?.latlng?.[0]
    const lng = countryDetails.capitalInfo?.latlng?.[1]
    const capital = countryDetails.capital?.[0] ?? 'N/A'

    const languages = Object.values(countryDetails.languages ?? {})
    const flagAlt = countryDetails.flags.alt ?? `${countryDetails.name.common} flag`

    return (
        <div>
            <h1>{countryDetails.name.common}</h1>
            <div>capital {capital}</div>
            <div>area {countryDetails.area}</div>
            <h3>languages:</h3>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={countryDetails.flags.png} alt={flagAlt} height="150" width="auto" />
            {lat != null && lng != null && (
                <Weather city={capital} lat={lat} lng={lng} />
            )}
        </div>
    )
}

export default CountryDetails