import { Input } from '@mui/material'
import type { ChangeEvent } from 'react'

type CountryFormProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const CountryForm = ({ value, onChange }: CountryFormProps) => {
  return (
    <form>
      <div>Find countries</div>
      <Input value={value} onChange={onChange} />
    </form>
  )
}

export default CountryForm