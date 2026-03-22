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
    // Persist inquiry even if email delivery later fails
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
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Elora Interiors Website" <${EMAIL_USER}>`,
      to: "contact.elorainteriors@gmail.com",
      subject: "New Contact Form Submission - Elora Interiors",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not provided"}</p>
        <p><strong>Message:</strong><br/>${(message || "").replace(/\\n/g, "<br/>")}</p>
      `,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType || "Not provided"}
Message: ${message}`,
    };

    // Fire-and-forget email to keep API responsive
    setImmediate(() => {
      transporter
        .sendMail(mailOptions)
        .then(() => console.log("Contact email dispatched"))
        .catch((mailErr) => console.error("Email send failed", mailErr));
    });

    return res
      .status(201)
      .json({ message: "Inquiry received", id: entry._id, emailStatus: "queued" });
  } catch (error) {
    console.error("Contact submission failed", error);
    res.status(500).json({ message: "Unable to process request right now." });
  }
});

export default router;

