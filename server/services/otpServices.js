export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpExpireTime = () => {
  return Date.now() + process.env.OTP_EXPIRE_MINUTES * 60 * 1000;
};
