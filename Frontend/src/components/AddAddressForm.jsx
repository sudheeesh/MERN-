import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

const AddAddressForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const countries = Country.getAllCountries();

  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry);
      setStates(stateList);
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(cityList);
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !phone ||
      !address ||
      !pincode ||
      !selectedCountry ||
      !selectedState ||
      !selectedCity
    ) {
      alert('Please fill all the required fields.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Enter a valid 6-digit pincode.');
      return;
    }

    const countryObj = countries.find((c) => c.isoCode === selectedCountry);
    const stateObj = states.find((s) => s.isoCode === selectedState);
    const cityObj = cities.find((c) => c.name === selectedCity);

    onSave({
      name,
      phoneNo:phone,
      address,
      pincode,
      landmark,
      country: {
        name: countryObj?.name,
        isoCode: countryObj?.isoCode,
      },
      state: {
        name: stateObj?.name,
        isoCode: stateObj?.isoCode,
      },
      city: {
        name: cityObj?.name,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Street Address"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Pincode"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        placeholder="Landmark (Optional)"
        className="w-full border px-3 py-2 rounded"
      />

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {states.length > 0 && (
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      )}

      {cities.length > 0 && (
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        className="w-72 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddAddressForm;
