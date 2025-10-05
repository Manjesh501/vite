import { z } from 'zod';

// Phone number validation schema
export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .min(7, 'Phone number must be at least 7 digits')
    .max(15, 'Phone number must be at most 15 digits'),
});

// OTP validation schema
export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

// Chatroom validation schema
export const chatroomSchema = z.object({
  title: z
    .string()
    .min(1, 'Chatroom title is required')
    .max(50, 'Chatroom title must be at most 50 characters'),
});

// Validate phone number
export const validatePhone = (data) => {
  try {
    phoneSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, errors };
  }
};

// Validate OTP
export const validateOtp = (data) => {
  try {
    otpSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, errors };
  }
};

// Validate chatroom
export const validateChatroom = (data) => {
  try {
    chatroomSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, errors };
  }
};