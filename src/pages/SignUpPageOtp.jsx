import React, { useState } from 'react';
import { DJ_BASE_URL } from '../config';
import { SignUpFormOtp } from '@/components/LoginFormComponent';
import { toast, Toaster } from 'sonner';

const FIXED_OTP = "12345Q"; // Fixed OTP code for testing purposes

const SignupPageOtp = () => {
  const [errors, setErrors] = useState({});
  const [isOtpValid, setIsOtpValid] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = (username, email, password) => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 5) newErrors.username = 'Username must be at least 5 characters long';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 5) newErrors.password = 'Password must be at least 5 characters long';
    return newErrors;
  };

  const signupUser = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formErrors = validateForm(username, email, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
      return;
    }

    const signupPromise = fetch(`${DJ_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong!');
      }
    });

    toast.promise(signupPromise, {
      loading: 'Loading...',
      success: 'Account created successfully! Please check your email to verify your account.',
      error: 'Something went wrong!',
    });
  };

  const validateOtp = (otp) => {
    console.log(`Received OTP for validation: ${otp}`); // Log OTP before validation
    if (otp === FIXED_OTP) {
      setIsOtpValid(true);
      toast.success("OTP validated successfully!");
    } else {
      setIsOtpValid(false);
      if (otp.length === 6) {
        toast.error("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUpFormOtp signupUser={signupUser} isOtpValid={isOtpValid} validateOtp={validateOtp} />
    </div>
  );
};

export default SignupPageOtp;
