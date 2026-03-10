import Weather from './Weather'
import type { Country } from '../types/country'
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

type CountryDetailsProps = {
  countryDetails: Country
  onBackToList?: () => void
}

const CountryDetails = ({ countryDetails, onBackToList }: CountryDetailsProps) => {
  const lat = countryDetails.capitalInfo?.latlng?.[0]
  const lng = countryDetails.capitalInfo?.latlng?.[1]
  const capital = countryDetails.capital?.[0] ?? 'N/A'

  const languages = Object.values(countryDetails.languages ?? {})
  const flagAlt = countryDetails.flags.alt ?? `${countryDetails.name.common} flag`
  const currencies = Object.entries(countryDetails.currencies ?? {})

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        {onBackToList && (
          <Button variant="text" size="small" onClick={onBackToList}>
            ← Back to list
          </Button>
        )}

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">{countryDetails.name.common.toUpperCase()}</Typography>
          <Box
            component="img"
            src={countryDetails.flags.png}
            alt={flagAlt}
            sx={{ height: 80, width: 'auto', borderRadius: 1, boxShadow: 1 }}
          />
        </Box>
        <Box>
          <Box display="flex" gap={1}>
            <Typography fontWeight="bold">Official name:</Typography>
            <Typography>{countryDetails.name.official}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography fontWeight="bold">Capital:</Typography>
            <Typography>{capital}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography fontWeight="bold">Region:</Typography>
            <Typography>{countryDetails.region}</Typography>
          </Box>
        </Box>

        {/* Languages box */}
        <Paper variant="outlined" sx={{ mt: 3, p: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="h6">Languages:</Typography>
          <ul>
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </Paper>

        {/* Currencies box */}
        <Paper variant="outlined" sx={{ mt: 3, p: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="h6">Currencies:</Typography>
          {currencies.length > 0 ? (
            <Table
              size="small"
              sx={{
                '& td': { border: 0 },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Short name</TableCell>
                  <TableCell>Symbol</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currencies.map(([code, currency]) => (
                  <TableRow key={code}>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell>{code}</TableCell>
                    <TableCell>{currency.symbol ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No currency data available
            </Typography>
          )}
        </Paper>

        {/* Weather box */}
        <Paper variant="outlined" sx={{ mt: 3, p: 2, backgroundColor: 'grey.50' }}>
          {lat != null && lng != null && <Weather city={capital} lat={lat} lng={lng} />}
        </Paper>
      </CardContent>
    </Card>
  )
}

export default CountryDetails
