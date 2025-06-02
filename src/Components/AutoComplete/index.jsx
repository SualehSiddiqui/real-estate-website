import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import propertyService from '../../Services/property';

function CustomAutoComplete({ value, onChange, city, type }) {
    const getCityOrState = async (type, query = "") => {
        console.log(type, query)
        try {
            if (query !== '') {
                const response = await propertyService.getCityOrState(type, query);
                return response.data || [];
            } else [];
        } catch (error) {
            console.log(`Error fetching ${type} properties:`, error.message);
            return [];
        }
    };

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (_, newInputValue) => {
        setInputValue(newInputValue);

        if (newInputValue.length < 2) {
            setOptions([]);
            return;
        }

        setLoading(true);
        console.log('type', type);
        console.log('newInputValue', newInputValue);
        const results = await getCityOrState(type, newInputValue);
        setOptions(results);
        setLoading(false);
    };

    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            inputValue={inputValue}
            value={value}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => onChange(newValue, city)}
            filterOptions={(x) => x} // Disable built-in filtering
            renderInput={(params) => (
                <TextField
                    {...params}
                    className="bill-inputs"
                    placeholder={`Search ${type}`}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option}>
                    {option.toUpperCase()}
                </li>
            )}
            noOptionsText="No Items Found"
            loading={loading}
            loadingText="Loading..."
            className="bill-inputs"
            required
        />
    );
}

export default CustomAutoComplete;
