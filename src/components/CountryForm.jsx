import { Input } from "@mui/material"

const CountryForm = ({value, onChange}) => {
    return (
      <form>

          
        <div>Find countries</div>
          <Input
            value={value}
            onChange={onChange}
          />

      </form>
    )
}

export default CountryForm