const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.SECRET;

const nodemailer = require("nodemailer");

const otpGenerator = require("otp-generator");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email ready to send", success);
  }
});

const createUser = async (req, res) => {
  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array() });
  }
  try {
    // Check whether the user with the email exists already
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Sorry a user with this email already exists!",
      });
    }

    // Create a salt to protect the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    await sendVerficationMail(user, res);

    // const data = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // // Create authtoken
    // const authtoken = jwt.sign(data, JWT_SECRET);

    // const response = {
    //   success: true,
    //   authtoken,
    //   msg: "You have signed up successfully!",
    // };

    // // Send the authtoken as a response
    res
      .status(200)
      .send({ success: true, msg: "Check your inbox to proceed futher!" });
  } catch (error) {
    // If some error occurs, display the errors
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const sendVerficationMail = async ({ _id, email }, res) => {
  const url = "http://localhost:3000/";

  const otpcode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your account",
      text: "Verify your account by clicking on this email. This link expires in 10 mins.",
      html: `<p>Verify your account by clicking on this email.</p><br><br><p>This link expires in 10 mins.</p><p>Press <a href=${
        url + "verify/" + _id + "/" + otpcode
      }>Click here</a> to proceed.</p>`,
    };

    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otpcode, salt);

    const newOtp = new Otp({
      userId: _id,
      code: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    await newOtp.save();

    transporter.sendMail(mailOptions);

    console.log("mail sent!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Enter correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, msg: "Enter correct credentials" });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        msg: "Email hasn't been verified yet. Check your email!",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    const response = {
      success: true,
      authtoken,
      msg: "You have logged in successfully!",
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const verifyUser = async (req, res) => {
  let { id: userId, otp: otpcode } = req.params;

  try {
    const user = await Otp.find({ userId });
    if (user.length > 0) {
      const { expiresAt } = user[0];
      const hashedOtp = user[0].code;
      console.log(
        Date.parse(expiresAt),
        Date.now(),
        Date.parse(expiresAt) < Date.now()
      );
      if (Date.parse(expiresAt) < Date.now()) {
        console.log("I am expired");
        try {
          await Otp.findOneAndDelete({ userId: userId });
          await User.findByIdAndDelete(userId);
          return res.status(400).send({
            success: false,
            msg: "Link has been expired. Try to signing up again!",
          });
        } catch (error) {
          return res.status(400).send({
            success: false,
            msg: "Error deleting the records!",
          });
        }
      } else {
        try {
          const result = await bcrypt.compare(otpcode, hashedOtp);

          if (result) {
            await User.findByIdAndUpdate({ _id: userId }, { verified: true });
            await Otp.findOneAndDelete({ userId });

            return res.status(200).send({
              success: true,
              msg: "Your account has been verified. You can login now!",
            });
          }
        } catch (error) {
          return res.status(400).send({
            success: false,
            msg: "Error while comparing password.",
          });
        }
      }
    } else {
      return res.status(400).send({
        success: false,
        msg: "Account record doesn't exist or has already been verified. Please sign up or log in.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal server error.",
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.status(200).json({ success: true, user: user });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error server!");
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  getUserDetails,
};
