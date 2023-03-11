import otpGenerate from 'otp-generator';
const passwordGenerator = async (digit = 6) => {
  const otp = otpGenerate.generate(digit, {
    alphabets: true,
    upperCase: true,
    specialChars: true,
  });
  return otp;
};

export default passwordGenerator;
