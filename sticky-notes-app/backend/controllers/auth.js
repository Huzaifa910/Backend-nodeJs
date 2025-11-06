import UserModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

export const signupController = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !age || !email || !password) {
      return res.json({
        message: "Fields are Empty",
        status: false,
        data: null,
      });
    }
    // find user by emial
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "User Already Exists",
        status: false,
      });
    }

    // hash pssword
    const hashPass = await bcrypt.hash(password, 10);
    // console.log("hashPass", hashPass);

    const body = {
      ...req.body,
      password: hashPass,
    };

    await UserModel.create(body);

    // send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Verification Email",
      // text: "Welcome to App!"
      html: `<!-- save this as a JS template string (backticks) or a separate .html file -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:30px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
        <!-- header -->
        <tr>
          <td style="padding:24px; text-align:center; background: linear-gradient(90deg,#0ea5a4,#06b6d4); color:#fff;">
            <h1 style="margin:0; font-size:20px; letter-spacing:0.4px;">YourApp Name</h1>
            <p style="margin:6px 0 0; font-size:13px; opacity:0.95;">One-Time Password (OTP)</p>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="padding:28px 32px 20px; color:#1f2937;">
            <p style="margin:0 0 14px; font-size:15px;">Assalamualaikum <strong>${name}</strong>,</p>

            <p style="margin:0 0 18px; font-size:15px; line-height:1.5;">
              Aapka <strong>One-Time Password (OTP)</strong> neeche diya gaya hai. Yeh OTP <strong>Expiry Date</strong> tak valid rahega. Kisi se share na karein.
            </p>

            <!-- OTP box -->
            <table cellpadding="0" cellspacing="0" role="presentation" style="margin:18px 0; width:100%;">
              <tr>
                <td align="center">
                  <div style="display:inline-block; padding:18px 28px; font-size:28px; letter-spacing:4px; background:#f8fafc; border:1px dashed #e6eef5; border-radius:8px; color:#0f172a; font-weight:700;">
                   123321
                  </div>
                </td>
              </tr>
            </table>

            <p style="margin:12px 0 0; font-size:13px; color:#475569;">
              Agar aapne yeh request nahi ki thi, to is email ko ignore kar dein — aapka account safe rahega.
            </p>
          </td>
        </tr>

        <!-- footer / CTA -->
        <tr>
          <td style="padding:20px 32px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="font-size:13px; color:#64748b;">
                  Regards,<br/>
                  <strong>YourApp Support</strong>
                </td>
                <td align="right">
                  <a href="https://yourapp.example" style="display:inline-block; text-decoration:none; padding:8px 14px; border-radius:6px; background:#0ea5a4; color:#ffffff; font-size:13px;">
                    Visit Dashboard
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- small footer note -->
        <tr>
          <td style="padding:14px 18px; text-align:center; font-size:12px; color:#94a3b8; background:#fbfdff;">
            This OTP email was generated for <span style="color:#0f172a;">${name}</span>. If you didn't request it, please ignore.
          </td>
        </tr>
      </table>

      <!-- mobile spacing -->
      <div style="max-width:600px; height:18px;"></div>
    </td>
  </tr>
</table>
`
    })
    

    res.json({
      message: "User Signup successfully..",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Required Fields are missing...",
        status: fasle,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid Email or Password",
        status: false,
      });
    }

    const comparePas = await bcrypt.compare(password, user.password);
    // console.log(comparePas);

    if (!comparePas) {
      return res.json({
        message: "Invalid Email or Password",
        status: false,
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "24h",
    });

    const userData = {
      name: user.name,
      age: user.age,
      email: user.email,
      _id: user._id,
    };

    res.json({
      message: "User Login Successfully",
      status: true,
      data: userData,
      token,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something Went Wrong!",
      status: false,
    });
  }
};
