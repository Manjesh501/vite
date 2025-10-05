// src/components/PhoneInputForm.jsx
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '../utils/validation';

const PhoneInputForm = ({ onContinue }) => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [countries, setCountries] = useState([
    { name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { name: 'South Africa', dialCode: '+27', flag: '🇿🇦' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(true);

  // Fetch countries data
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd')
      .then(response => response.json())
      .then(data => {
        const formattedCountries = data
          .filter(country => country.idd && country.idd.root) // Only countries with dial codes
          .map(country => ({
            name: country.name.common,
            dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
            flag: country.flags?.png || '🏳️'
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        if (formattedCountries.length > 0) {
          setCountries(formattedCountries);
        }
        setIsFetchingCountries(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setIsFetchingCountries(false);
        // Fallback countries are already set as initial state
      });
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: '',
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      onContinue(data.phoneNumber, selectedCountry);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render flag properly
  const renderFlag = (flag) => {
    // If flag is a URL, render as image
    if (flag && (flag.startsWith('http://') || flag.startsWith('https://'))) {
      return (
        <img 
          src={flag} 
          alt="Flag" 
          className="w-5 h-4 object-cover rounded-sm inline-block mr-2" 
          onError={(e) => {
            // If image fails to load, show emoji flag or default
            e.target.style.display = 'none';
            const flagSpan = document.createElement('span');
            flagSpan.textContent = '🏳️';
            flagSpan.className = 'mr-2';
            e.target.parentNode.insertBefore(flagSpan, e.target);
          }}
        />
      );
    }
    // If flag is an emoji, render as text
    return <span className="mr-2">{flag}</span>;
  };

  // Get flag for selected country
  const getSelectedCountryFlag = () => {
    const country = countries.find(c => c.name === selectedCountry);
    return country ? country.flag : '🏳️';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Enter your phone number</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="relative">
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
              disabled={isFetchingCountries}
            >
              {countries.map(country => (
                <option key={country.name} value={country.name}>
                  {renderFlag(country.flag)}
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${
                errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phoneNumber ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isFetchingCountries}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
};

export default PhoneInputForm;