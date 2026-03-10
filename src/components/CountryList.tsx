type CountryListProps = {
    countriesToShow: string[]
    setSelectedCountry: (country: string) => void
}

const CountryList = ({ countriesToShow, setSelectedCountry }: CountryListProps) => {
    return (
        <div>
            {countriesToShow.map(countryToShow => (
                <div key={countryToShow}>
                    {countryToShow}
                    <button onClick={() => setSelectedCountry(countryToShow)}>show</button>
                </div>
            ))}
            <div>Show country info by selecting a country</div>
        </div>
    )
}

export default CountryList
