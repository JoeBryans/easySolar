import { SendVerificationMail } from "@/lib/mailer";
import { VerifyMailTemplate } from "@/lib/mailTemplate";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, name, verifyToken } = await req.json();

  // Validate the request body (optional but recommended)
  if (!email || !verifyToken || !name) {
    return NextResponse.json({
      error:
        "Please provide recipient, subject, and either text or HTML content.",
    });
  }

  try {
    // Create a Nodemailer transporter using Gmail SMTP
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_EMAIL, // Your Gmail address
    //     pass: process.env.GMAIL_APP_PASSWORD, // Your generated App Password
    //   },
    // });

    // Define the email options
    // const mailOptions = {
    //   from: process.env.GMAIL_EMAIL, // Sender address
    //   to: email, // Recipient address(es)
    //   subject: "verify your email", // Subject of the email
    //   // text: text, // Plain text body (optional if using HTML)
    //   html: VerifyMailTemplate.replace("{name}", name).replace(
    //     "{code}",
    //     verifyToken
    //   ), // HTML body (optional if using plain text)
    // };

    // Send the email
    // const sendResult = await transporter.sendMail(mailOptions);
    const sendResult = SendVerificationMail(email, name, verifyToken);
    console.log("Verification email sent successfully to:", sendResult);

    return NextResponse.json({
      message: "Email sent successfully!",
      sendResult: sendResult,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email." });
  }
}
