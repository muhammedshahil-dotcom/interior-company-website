import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }
  try {
    const entry = await Contact.create({ name, email, phone, projectType, message });

    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Email credentials missing: EMAIL_USER and/or EMAIL_PASS not set");
      return res.status(201).json({
        message: "Inquiry received. Email notification not sent (server email not configured).",
        id: entry._id,
        emailStatus: "not_configured",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "New Contact Message – Elora Interiors",
      text: `Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType || "Not provided"}
Message: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(201).json({ message: "Inquiry received", id: entry._id, emailStatus: "sent" });
    } catch (mailErr) {
      console.error("Email send failed", mailErr);
      return res.status(201).json({
        message: "Inquiry received. Email notification could not be sent.",
        id: entry._id,
        emailStatus: "failed",
      });
    }
  } catch (error) {
    console.error("Contact submission failed", error);
    res.status(500).json({ message: "Unable to process request right now." });
  }
});

export default router;
