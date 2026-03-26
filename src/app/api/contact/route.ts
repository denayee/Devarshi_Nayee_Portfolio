import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailSubject = subject 
      ? `Portfolio Contact: ${subject} (from ${name})` 
      : `New Portfolio Contact from ${name}`;

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

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #1a202c; margin: 0; font-size: 24px; font-weight: 700;">New Portfolio Inquiry</h2>
          <p style="color: #4a5568; font-size: 14px; margin-top: 5px;">You have received a new message from your website's contact form.</p>
        </div>
        
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #3182ce;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase; font-weight: 600; width: 100px;">From</td>
              <td style="padding: 8px 0; color: #2d3748; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #3182ce; text-decoration: none; font-weight: 500;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase; font-weight: 600;">Subject</td>
              <td style="padding: 8px 0; color: #2d3748; font-weight: 500;">${subject || 'No Subject Provided'}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2d3748; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Message Content</h3>
          <div style="background-color: #fcfcfc; padding: 20px; border-radius: 8px; border: 1px solid #edf2f7; color: #4a5568; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; pt-4; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0;">
            This email was automatically generated from your website's contact form.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.MAIL_USERNAME, // The authenticated sender (must match your SMTP user)
      to: process.env.MAIL_USERNAME, // Send the message to yourself! 
      replyTo: email, // Reply-to the user who filled the form on the website
      subject: emailSubject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
      html: htmlContent,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
