import { TextField } from '@mui/material'
import type { ChangeEvent } from 'react'

type CountryFormProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const CountryForm = ({ value, onChange }: CountryFormProps) => {
  return (
    <TextField
      label="Find countries"
      variant="outlined"
      size="small"
      helperText="Start typing a country name"
      value={value}
      onChange={onChange}
    />
  )
}

export default CountryForm
