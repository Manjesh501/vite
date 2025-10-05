// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import PhoneInputForm from '../components/PhoneInputForm';
import OtpVerificationForm from '../components/OtpVerificationForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUser, setPhoneNumber, setCountryCode } from '../redux/authSlice';

const LoginPage = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumberLocal] = useState('');
  const [countryCode, setCountryCodeLocal] = useState('India');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = (phone, country) => {
    setPhoneNumberLocal(phone);
    setCountryCodeLocal(country);
    setStep('otp');
  };

  const handleVerify = (otp) => {
    // Simulate successful authentication
    const user = {
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      token: 'fake-token-' + Date.now()
    };
    
    // Update Redux store
    dispatch(setAuthenticated(true));
    dispatch(setUser(user));
    dispatch(setPhoneNumber(phoneNumber));
    dispatch(setCountryCode(countryCode));
    
    // Also save to localStorage for persistence
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('countryCode', countryCode);
    
    // Navigate to dashboard after successful authentication
    // Using a short timeout to show the success message
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">G</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Gemini Chat
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your phone number to get started
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 transition-all duration-300 hover:shadow-2xl">
          {step === 'phone' ? (
            <PhoneInputForm onContinue={handleContinue} />
          ) : (
            <OtpVerificationForm 
              onVerify={handleVerify} 
              phoneNumber={phoneNumber} 
              countryCode={countryCode} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;