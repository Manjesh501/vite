// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import PhoneInputForm from '../components/PhoneInputForm';
import OtpVerificationForm from '../components/OtpVerificationForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US');

  const navigate = useNavigate();

  const handleContinue = (phone, country) => {
    setPhoneNumber(phone);
    setCountryCode(country);
    setStep('otp');
  };

  const handleVerify = (otp) => {
    // Simulate successful authentication
    localStorage.setItem('authToken', 'fake-token');
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('countryCode', countryCode);
    
    // Navigate to dashboard after successful authentication
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
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