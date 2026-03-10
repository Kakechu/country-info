import { Button, Card, CardContent, CardHeader, List, ListItem, ListItemText, Typography } from "@mui/material"

type CountryListProps = {
    countriesToShow: string[]
    setSelectedCountry: (country: string) => void
}

const CountryList = ({ countriesToShow, setSelectedCountry }: CountryListProps) => {
    return (
        <Card>
        <CardHeader title="Matching countries" />
        <CardContent>
        <List dense>
            {countriesToShow.map(countryToShow => (
                <ListItem key={countryToShow} secondaryAction={<Button variant="outlined" size="small" onClick={() => setSelectedCountry(countryToShow)}>show</Button>}>
                    <ListItemText primary={countryToShow} />
                </ListItem>
            ))}
            
        </List>
        </CardContent>
        <Typography variant="body2" color="text.secondary">Show country info by selecting a country</Typography>
        </Card>
    )
}

export default CountryList
