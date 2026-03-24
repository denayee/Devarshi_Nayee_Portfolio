import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailSubject = subject || `New Portfolio Contact from ${name}`;

    // Determine secure connection setup based on your configuration
    const isSecure = process.env.MAIL_PORT === '465' || process.env.MAIL_USE_TLS === 'true';

    // Create a transporter using your custom SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: isSecure, 
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME, // The authenticated sender (must match your SMTP user)
      to: process.env.MAIL_USERNAME, // Send the message to yourself! 
      replyTo: email, // Reply-to the user who filled the form on the website
      subject: emailSubject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
