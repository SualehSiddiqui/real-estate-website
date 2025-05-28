import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CustomAutoComplete({ options, value, onChange, city }) {

    return <Autocomplete
        id="combo-box-demo"
        options={options}
        value={value?.toUpperCase()}
        filterOptions={(options, { inputValue }) =>
            options.filter(option =>
                option.toUpperCase() === inputValue.toUpperCase() ||
                option.toUpperCase().startsWith(inputValue.toUpperCase())
            )
        }
        renderInput={(params) => (
            <TextField
                className="bill-inputs"
                {...params}
                placeholder="Search Items"
            />
        )}
        renderOption={(props, option) => {
            return (
                <li
                    {...props}
                    key={option}
                >
                    {option.toUpperCase()}
                </li>
            );
        }}
        onChange={(event, value) => onChange(value, city)}
        noOptionsText="No Items Found"
        loadingText="Loading....."
        className={`bill-inputs`}
        required
    />
}

export default CustomAutoComplete;