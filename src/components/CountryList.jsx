const CountryList = ({ countriesToShow, setSelectedCountry }) => {
    return (
        <div>
            {countriesToShow.map(countryToShow => (
                <div key={countryToShow}>
                    {countryToShow}<button onClick={() => setSelectedCountry(countryToShow)}>show</button>
                </div>
            ))}
            <div>Show country info by selecting a country</div>
        </div>
    )
}

export default CountryList
