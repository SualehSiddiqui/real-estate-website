import "./style.css";
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { IoSearch } from 'react-icons/io5';
import UsStates from "states-us";
import { UsCities } from "../../Utils";

// Sample data for US states and cities
const states = UsStates.map(x => x.name.toLowerCase());

// Helper to filter suggestions by input value
const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    if (inputValue.length === 0) return [];

    // Filter states and cities separately
    const filteredStates = states.filter(state =>
        state.toLowerCase().startsWith(inputValue)
    );

    const filteredCities = UsCities.filter(city =>
        city.toLowerCase().startsWith(inputValue)
    );

    // Return array of sections with titles
    return [
        {
            title: 'States',
            suggestions: filteredStates.map(name => ({ name, type: 'State' })),
        },
        {
            title: 'Cities',
            suggestions: filteredCities.map(name => ({ name, type: 'City' })),
        }
    ].filter(section => section.suggestions.length > 0);
};

// How suggestions are rendered in the dropdown
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

const PropertySearchAutocomplete = ({ onSearch }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);  // New state

    // Called every time input changes
    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    // Called when suggestions are requested
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    // Called when suggestions should be cleared
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // When suggestion is selected
    const onSuggestionSelected = (event, { suggestion }) => {
        setValue(suggestion.name);
        setSelectedLocation(suggestion);  // Save the full suggestion object
    };

    // Reset function to clear input, suggestions, and selected location
    const resetSearch = () => {
        setValue('');
        setSuggestions([]);
        setSelectedLocation(null);
    };

    // Autosuggest input props
    const inputProps = {
        placeholder: 'Enter City or State',
        value,
        onChange
    };

    return (
        <>
            <div className="input-search-div">
                <Autosuggest
                    multiSection={true}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={renderSuggestion}
                    renderSectionTitle={section => <p className="mb-0">{section.title}</p>}
                    getSectionSuggestions={section => section.suggestions}
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
                        onSearch(selectedLocation);
                        resetSearch();
                    }}
                >
                    <IoSearch size={20} />
                </div>
            </div>
        </>
    );
};

export default PropertySearchAutocomplete;
