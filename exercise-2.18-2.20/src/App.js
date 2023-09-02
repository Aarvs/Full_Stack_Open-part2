
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then((response) => {
          setCountries(response.data);
          setSelectedCountry(null);
        })
        .catch(() => {
          setCountries([]);
          setSelectedCountry(null);
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setCountries([]);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        Find countries:{" "}
        <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <ul>
            {countries.map((country, index) => (
              <li key={index}>
                {country.name.common}
                <button onClick={() => handleCountryClick(country)}>
                  Show
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
    {/* The code block inside the parentheses is rendered only if 
    selectedCountry has a value (is truthy). Otherwise, nothing is 
    rendered in its place. This is a common pattern in React for 
    conditionally rendering UI components based on certain conditions. */}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area} km²</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={selectedCountry.flags.png}
          alt={`${selectedCountry.name.common}'s flag`}
          style={{ maxWidth: "150px" }}
        />
        </div>
      )}
    </div>
  );
};

export default App;


