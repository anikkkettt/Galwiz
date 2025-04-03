const multer = require("multer");
const User = require("./../../models/user/userModel");
const jwt = require("jsonwebtoken");
const UserOtp = require("./../../models/user/userOTPModel");
const nodemailer = require("nodemailer");
const { otpHtml } = require("./otpHtml");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 62 * 62 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  user.password = undefined;
  res.cookie("bearerToken", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    message: "Login Successfully",
    data: {
      user,
      token,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user) {
        const userOtp = await UserOtp.findOne({ email });
        var otpDate = new Date(userOtp.updatedAt.getTime() + 100 * 60000);
        if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
          user.emailApprove = true;
          await user.save();
          await userOtp.save();
          // send token
          createSendToken(user, 200, res);
        } else if (otpDate < new Date(Date.now())) {
          res.status(401).json({
            status: "unauthorized ",
            message: "Otp Expire",
          });
        } else {
          res.status(401).json({
            status: "unauthorized ",
            message: "Incorrect OTP",
          });
        }
      }
    }
  } catch (error) {}
};

exports.userSignUp = async (req, res) => {
  try {
    const {
      userName,
      email,
      firstName,
      passwordConfirm,
      lastName,
      password,
      githubUserName,
    } = req.body;
    const emailCheck = await User.findOne({ email });
    const userNameCheck = await User.findOne({ userName });
    if (emailCheck || userNameCheck) {
      res.status(409).json({
        status: "conflict",
        message: "User Already exist ",
      });
    } else {
      const user = await User.create({
        userName,
        email,
        firstName,
        lastName,
        passwordConfirm,
        password,
        githubUserName,
      });
      const otp =
        `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}` * 1;

      await UserOtp.create({
        email,
        otp,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_MAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      const mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to: email,
        subject: "OTP Verification Email",
        // text: `Your otp is ${otp}`,
        html: otpHtml(otp),
      };
      console.log(otp);
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
      });

      res.status(201).json({
        status: "created",
        message: "User Created successfully and Otp sended to email",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!(email || userName) || !password) {
      res.status(404).json({
        status: "success",
        message: "Enter Password Or Email",
      });
    } else {
      if (email) {
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.correctPassword(password, user.password))) {
          res.status(403).json({
            status: "unauthorized",
            message: "Invalid Username or Password",
          });
        } else {
          if (user.emailApprove) {
            createSendToken(user, 200, res);
          } else {
            // send email
            const otp =
              `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
                Math.random() * 9 + 1
              )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
                Math.random() * 9 + 1
              )}` * 1;
            const checkOTP = await UserOtp.findOne({ email: user.email });
            checkOTP.otp = otp;
            await checkOTP.save();
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASS,
              },
            });
            const mailOptions = {
              from: process.env.NODEMAILER_MAIL,
              to: email,
              subject: "OTP Verification Email",
              // text: `Your otp is ${otp}`,
              html: otpHtml(otp),
            };
            console.log(otp);
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) console.log(err);
            });

            res.status(203).json({
              status: "success",
              message: "OTP Send To you Email Id",
            });
          }
        }
      } else if (userName) {
        const user = await User.findOne({ userName }).select("+password");
        if (!user || !(await user.correctPassword(password, user.password))) {
          res.status(403).json({
            status: "unauthorized",
            message: "Invalid Username or Password",
          });
        } else {
          if (user.emailApprove) {
            createSendToken(user, 200, res);
          } else {
            // send email
            const otp =
              `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
                Math.random() * 9 + 1
              )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
                Math.random() * 9 + 1
              )}` * 1;
            const checkOTP = await UserOtp.findOne({ email: user.email });
            checkOTP.otp = otp;
            await checkOTP.save();
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASS,
              },
            });
            const mailOptions = {
              from: process.env.NODEMAILER_MAIL,
              to: email,
              subject: "OTP Verification Email",
              // text: `Your otp is ${otp}`,
              html: otpHtml(otp),
            };
            console.log(otp);
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) console.log(err);
            });

            res.status(203).json({
              status: "success",
              message: "OTP Send To you Email Id",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",

      message: "Internal Server Error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id, password, passwordConfirm } = req.body;
    if (password === passwordConfirm) {
      const user = await User.findById(id).select("+password");
      user.password = req.body.password;
      user.passwordConfirm = req.body.password;
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Password Changed Successfully ",
      });
    } else {
      res.status(409).json({
        status: "conflict",
        message: "Password Must Be Same",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    if (
      !user ||
      !(await user.correctPassword(req.body.oldPassword, user.password))
    ) {
      res.status(403).json({
        status: "unauthorized",
        message: "Invalid Username or Password",
      });
    } else {
      user.password = req.body.password;
      user.passwordConfirm = req.body.password;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "Password Changed Successfully ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.updateName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findById(req.user._id);
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "User Name is Successfully updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, userName } = req.body;
    if (email) {
      if (!email) {
        res.status(401).json({
          status: "success",
          message: "Invalid Email Id",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          status: "success",
          message: "Email id not found",
        });
      } else {
        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        const checkOTP = await UserOtp.findOne({ email });
        if (!checkOTP) {
          await UserOtp.create({
            email,
            otp,
          });
          console.log(otp);
          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        } else {
          checkOTP.otp = otp;
          await checkOTP.save();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_MAIL,
              pass: process.env.NODEMAILER_PASS,
            },
          });
          const mailOptions = {
            from: process.env.NODEMAILER_MAIL,
            to: email,
            subject: "OTP Verification Email",
            // text: `Your otp is ${otp}`,
            html: otpHtml(otp),
          };
          console.log(otp);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
          });

          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        }
      }
    } else if (userName) {
      if (!userName) {
        res.status(401).json({
          status: "success",
          message: "Invalid UserName Id",
        });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        res.status(404).json({
          status: "success",
          message: "UserName not found",
        });
      } else {
        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        const checkOTP = await UserOtp.findOne({ email: user.email });
        if (!checkOTP) {
          await UserOtp.create({
            email: user.email,
            otp,
          });
          console.log(otp);
          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        } else {
          checkOTP.otp = otp;
          await checkOTP.save();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_MAIL,
              pass: process.env.NODEMAILER_PASS,
            },
          });
          const mailOptions = {
            from: process.env.NODEMAILER_MAIL,
            to: user.email,
            subject: "OTP Verification Email",
            // text: `Your otp is ${otp}`,
            html: otpHtml(otp),
          };
          console.log(otp);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
          });

          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email, userName } = req.body;
    if (email) {
      if (!email) {
        res.status(401).json({
          status: "success",
          message: "Invalid Email Id",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          status: "success",
          message: "Email id not found",
        });
      } else {
        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        const checkOTP = await UserOtp.findOne({ email });
        if (!checkOTP) {
          await UserOtp.create({
            email,
            otp,
          });
          console.log(otp);
          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        } else {
          checkOTP.otp = otp;
          await checkOTP.save();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_MAIL,
              pass: process.env.NODEMAILER_PASS,
            },
          });
          const mailOptions = {
            from: process.env.NODEMAILER_MAIL,
            to: email,
            subject: "OTP Verification Email",
            // text: `Your otp is ${otp}`,
            html: otpHtml(otp),
          };
          console.log(otp);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
          });

          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        }
      }
    } else if (userName) {
      if (!userName) {
        res.status(401).json({
          status: "success",
          message: "Invalid UserName Id",
        });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        res.status(404).json({
          status: "success",
          message: "UserName not found",
        });
      } else {
        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        const checkOTP = await UserOtp.findOne({ email: user.email });
        if (!checkOTP) {
          await UserOtp.create({
            email: user.email,
            otp,
          });
          console.log(otp);
          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        } else {
          checkOTP.otp = otp;
          await checkOTP.save();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_MAIL,
              pass: process.env.NODEMAILER_PASS,
            },
          });
          const mailOptions = {
            from: process.env.NODEMAILER_MAIL,
            to: user.email,
            subject: "OTP Verification Email",
            // text: `Your otp is ${otp}`,
            html: otpHtml(otp),
          };
          console.log(otp);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
          });

          res.status(200).json({
            status: "success",
            message: "OTP Send To you Email Id",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.changePasswordOTP = async (req, res) => {
  try {
    const { email, userName, password, passwordConfirm } = req.body;
    const otp = req.body.otp * 1;
    if (email) {
      const checkEmail = await User.findOne({ email }).select("+password");
      if (checkEmail) {
        const userOtp = await UserOtp.findOne({ email });
        var otpDate = new Date(userOtp.updatedAt.getTime() + 100 * 60000);
        if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
          checkEmail.password = password;
          checkEmail.passwordConfirm = passwordConfirm;
          await checkEmail.save();

          res.status(200).json({
            status: "success",
            message: "Password change Successfully",
          });
        } else if (otpDate < new Date(Date.now())) {
          res.status(401).json({
            status: "unauthorized ",
            message: "Otp Expire",
          });
        } else {
          res.status(401).json({
            status: "unauthorized ",
            message: "Incorrect OTP",
          });
        }
      }
    } else if (userName) {
      const checkEmail = await User.findOne({ userName }).select("+password");
      if (checkEmail) {
        const userOtp = await UserOtp.findOne({ email: checkEmail.email });
        var otpDate = new Date(userOtp.updatedAt.getTime() + 100 * 60000);
        if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
          checkEmail.password = password;
          checkEmail.passwordConfirm = passwordConfirm;
          await checkEmail.save();

          res.status(200).json({
            status: "success",
            message: "Password change Successfully",
          });
        } else if (otpDate < new Date(Date.now())) {
          res.status(401).json({
            status: "unauthorized ",
            message: "Otp Expire",
          });
        } else {
          res.status(401).json({
            status: "unauthorized ",
            message: "Incorrect OTP",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.dashboard = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.cookie && req.headers.cookie.startsWith("bearer")) {
      token = req.headers.cookie.split("=")[1];

      if (!token) {
        res.status(401).json({
          status: "unauthorized",
          message: "you are not logged in ! please log in to get access",
        });
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          res.status(404).json({
            status: "not found",
            message: "User not found",
          });
        } else {
          req.user = currentUser;
          next();
        }
      }
    } else {
      res.status(404).json({ status: "not found", message: "User Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "unauthorized",
      message: "you are not logged in ! please log in to get error access",
    });
  }
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "public/uploads/user/image";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.user._id}.${ext}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
});

exports.uploadImage = imageUpload.single("image");

exports.uploadUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.photo = req.file.filename;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Use Case is submit successfully",
      photo: req.file.filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.logOut = async (req, res) => {
  try {
    console.log("logOut");

    res.status(200).clearCookie("bearerToken");
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
