import { validatePhone, validateOtp, validateChatroom } from '../src/utils/validation';

describe('validation', () => {
  describe('validatePhone', () => {
    it('should validate a correct phone number', () => {
      const data = {
        countryCode: '+1',
        phoneNumber: '1234567890',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty phone number', () => {
      const data = {
        countryCode: '+1',
        phoneNumber: '',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(false);
      expect(result.errors.phoneNumber).toBe('Phone number is required');
    });

    it('should reject phone number with letters', () => {
      const data = {
        countryCode: '+1',
        phoneNumber: '123abc',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(false);
      expect(result.errors.phoneNumber).toBe('Phone number must contain only digits');
    });
  });

  describe('validateOtp', () => {
    it('should validate a correct OTP', () => {
      const data = {
        otp: '123456',
      };
      
      const result = validateOtp(data);
      expect(result.success).toBe(true);
    });

    it('should reject incorrect OTP length', () => {
      const data = {
        otp: '12345',
      };
      
      const result = validateOtp(data);
      expect(result.success).toBe(false);
      expect(result.errors.otp).toBe('OTP must be exactly 6 digits');
    });
  });

  describe('validateChatroom', () => {
    it('should validate a correct chatroom title', () => {
      const data = {
        title: 'Test Chatroom',
      };
      
      const result = validateChatroom(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty chatroom title', () => {
      const data = {
        title: '',
      };
      
      const result = validateChatroom(data);
      expect(result.success).toBe(false);
      expect(result.errors.title).toBe('Chatroom title is required');
    });
  });
});