import "./style.css";
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { IoSearch } from 'react-icons/io5';
import propertyService from "../../Services/property";
import debounce from "lodash.debounce";

const PropertySearchAutocomplete = ({ onSearch }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const fetchSuggestions = React.useMemo(() => debounce(async (inputValue) => {
        if (!inputValue.trim()) {
            setSuggestions([]);
            return;
        }
        try {
            // Get states and cities separately
            const [cityRes, stateRes] = await Promise.all([
                propertyService.getCityOrState('city', inputValue),
                propertyService.getCityOrState('state', inputValue),
            ]);

            // Format data as required by Autosuggest with sections
            const citySuggestions = (cityRes.data || []).map(name => ({ name, type: 'City' }));
            const stateSuggestions = (stateRes.data || []).map(name => ({ name, type: 'State' }));

            const combined = [
                { title: 'States', suggestions: stateSuggestions },
                { title: 'Cities', suggestions: citySuggestions }
            ].filter(section => section.suggestions.length > 0);

            setSuggestions(combined);

        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    }, 300), []);

    const onChange = (event, { newValue }) => {
        setValue(newValue);
        fetchSuggestions(newValue);
    };

    const onSuggestionsFetchRequested = () => {
        // We fetch suggestions onChange, so no need here
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>{suggestion.name}</div>
    );

    const renderSectionTitle = section => (
        <p className="mb-0">{section.title}</p>
    );

    const getSectionSuggestions = section => section.suggestions;

    const onSuggestionSelected = (event, { suggestion }) => {
        setValue(suggestion.name);
        setSelectedLocation(suggestion);
    };

    const resetSearch = () => {
        setValue('');
        setSuggestions([]);
        setSelectedLocation(null);
    };

    const inputProps = {
        placeholder: 'Enter City or State',
        value,
        onChange
    };

    return (
        <div className="input-search-div">
            <Autosuggest
                multiSection={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                onSuggestionSelected={onSuggestionSelected}
                inputProps={inputProps}
                renderSuggestionsContainer={({ containerProps, children }) => {
                    if (!children || React.Children.count(children) === 0) {
                        return null;
                    }
                    return <div {...containerProps}>{children}</div>;
                }}
            />
            <div
                className="search-icon"
                onClick={() => {
                    console.log(selectedLocation)
                    onSearch(selectedLocation);
                    resetSearch();
                }}
            >
                <IoSearch size={20} />
            </div>
        </div>
    );
};

export default PropertySearchAutocomplete;
