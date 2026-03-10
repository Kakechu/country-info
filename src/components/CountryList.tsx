import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'

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
          {countriesToShow.map((countryToShow) => (
            <ListItem key={countryToShow} disablePadding>
              <ListItemButton onClick={() => setSelectedCountry(countryToShow)}>
                <ListItemText primary={countryToShow} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="text.secondary">
          Show country info by selecting a country
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CountryList
