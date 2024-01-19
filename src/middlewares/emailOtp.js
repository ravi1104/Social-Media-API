import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user:'codingninjas2k16@gmail.com',
    pass:'slwvvlczduktvhdj',
  },
});

var otpMap = new Map();

export const emailOtp = async (req, res, next) => {
  const email = req.user.email;
  // const email='abc@gmail.com'
  if (!email) {
    return res.status(400).json({ success: false, message: "Email not provided" });
  }

  // Generate OTP
  const OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

  const mailOptions = {
    from: 'codingninjas2k16@gmail.com',
    to: email,
    subject: 'Reset Password - One Time Password',
    text: `Your One Time Password (OTP) is: ${OTP}. Please use it to reset your password.`
  };
  otpMap.set(email,OTP);
  try{ 
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: `OTP sent successfully to ${email}`});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
 
    
};

export const validateOtp = (req, res, next) => {
  const email=req.user.email;
  const otp=req.query.otp;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  // Retrieve stored OTP corresponding to the email
  const storedOTP = otpMap.get(email);
  if (!storedOTP || storedOTP !== otp) {
    return res.status(401).json({ success: false, message: "Invalid OTP" });
  }

  otpMap.delete(email);

  next();
};
