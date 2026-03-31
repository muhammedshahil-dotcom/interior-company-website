import express from "express";
import Contact from "../models/Contact.js";
import { authRequired } from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", authRequired, async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    // Persist inquiry even if email delivery later fails
    const entry = await Contact.create({ name, email, phone, projectType, message });

    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return res.status(201).json({
        message: "Inquiry received but email not configured",
        id: entry._id,
        emailStatus: "not_configured",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const companyMail = {
      from: `"Elora Interiors" <${EMAIL_USER}>`,
      to: ["contact.elorainteriors@gmail.com", "contact@elorainteriors.in"],
      subject: "New Contact Form Submission",
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Project Type:</b> ${projectType || "Not provided"}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    const replyMail = {
      from: `"Elora Interiors" <${EMAIL_USER}>`,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Thanks for contacting Elora Interiors</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and our team will contact you within 24 hours.</p>
        <p>Regards,<br/>Elora Interiors</p>
      `,
    };

    console.log("Sending email via Zoho SMTP...");

    setImmediate(async () => {
      try {
        await transporter.sendMail(companyMail);
        await transporter.sendMail(replyMail);
        console.log("Emails sent successfully");
      } catch (err) {
        console.error("Email failed:", err);
      }
    });

    return res.status(200).json({
      message: "Message sent successfully",
      id: entry._id,
      emailStatus: "queued",
    });
  } catch (error) {
    console.error("Contact submission failed", error);
    res.status(500).json({ message: "Unable to process request right now." });
  }
});

export default router;
