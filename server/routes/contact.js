import express from "express";
import Contact from "../models/Contact.js";
import { Resend } from "resend";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authRequired, async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    // Persist inquiry even if email delivery later fails
    const entry = await Contact.create({ name, email, phone, projectType, message });

    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing!");
      return res.status(201).json({
        message: "Inquiry received but email not configured",
        id: entry._id,
        emailStatus: "not_configured",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Sending email via Resend...");

    // Fire-and-forget to keep response fast
    setImmediate(() => {
      resend.emails
        .send({
          from: "onboarding@resend.dev",
          to: "contact.elorainteriors@gmail.com",
          subject: "New Contact Form Submission",
          html: `
            <h2>New Inquiry</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone || "Not provided"}</p>
            <p><b>Project Type:</b> ${projectType || "Not provided"}</p>
            <p><b>Message:</b> ${message}</p>
          `,
          text: "New inquiry received",
        })
        .then((resp) => {
          console.log("Email success:", resp);
        })
        .catch((err) => {
          console.error("Email error FULL:", err);
          console.error("Email failed FULL:", JSON.stringify(err, null, 2));
        });
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

// Manual test route to verify email delivery quickly
router.get("/test-email", async (_req, res) => {
  try {
    console.log("TEST EMAIL ROUTE HIT");
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing!");
      return res.status(500).json({ message: "Email credentials not configured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Sending test email via Resend...");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "contact.elorainteriors@gmail.com",
      subject: "Test Email - Elora Interiors",
      html: "<p>This is a test email from the Elora Interiors backend.</p>",
      text: "Test email from Elora Interiors backend",
    });

    console.log("Email sent successfully (test)");
    return res.json({ message: "Test email sent" });
  } catch (err) {
    console.error("Email error FULL:", err);
    console.error("Email failed FULL:", JSON.stringify(err, null, 2));
    return res.status(500).json({ message: "Test email failed", error: err.message });
  }
});

export default router;
