const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");
const UserOTPverification = require("../models/UserOTPverification.js");


// Register User Function
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register(name, email, password);
    await sendVerificationLink(user, res);
    // res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User Function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.json({ user: email, token });
        }
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile Function
const getProfile = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  console.log("USER", user);
  if (user.email) {
    res.json(user);
  } else {
    res.json(null);
  }
};

// EMAIL Provider
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Sending Email with OTP
const sendVerificationLink = async (user, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOption = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `<p>Your OTP for Verification is <b>${otp}</b>. This is only valid for 1 Hour</p>`,
    };

    const hashedOTP = await bcrypt.hash(otp, 10);

    const newOTPverifiaction = await UserOTPverification.create({
      userId: user.email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    console.log(otp);
    await newOTPverifiaction.save();
    await transporter.sendMail(mailOption);

    res.json({
      user: user,
      status: "PENDING",
      message: "OTP Sent",
      data: {
        userId: user.email,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      user: user,
      status: "FAILED",
      message: error.message,
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty Details Are Not Allowed");
    } else {
      const UserVerificationRecord = await UserOTPverification.find({
        userId,
      });
      if (UserVerificationRecord.length == 0) {
        throw Error("No Record Found");
      } else {
        const { expiresAt } = UserVerificationRecord[0];
        const hashedOTP = UserVerificationRecord[0].otp;

        if (expiresAt < Date.now()) {
          UserOTPverification.deleteMany({ userId: userId });
          throw new Error("OTP has Expired ");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            throw new Error("Invalid OTP");
          } else {
            await User.updateOne({ email: userId }, { verified: true });
            await UserOTPverification.deleteMany({ userId: userId });
            res.json({
              status: "verified",
              message: "User is Verified Successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// Exports
module.exports = { registerUser, loginUser, getProfile, verifyOTP };
