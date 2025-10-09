import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function createEmailTransporter() {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  };

  if (!config.auth.user || !config.auth.pass) {
    console.warn('Email not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    return null;
  }

  return nodemailer.createTransport(config);
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  const transporter = createEmailTransporter();

  if (!transporter) {
    console.log('Email transporter not configured, skipping email send');
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'Montero.team.kr@gmail.com';

  try {
    await transporter.sendMail({
      from: `"MONTERO Contact Form" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `.trim(),
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
  </div>
  <div style="margin: 20px 0;">
    <h3 style="color: #333;">Message:</h3>
    <p style="white-space: pre-wrap;">${data.message}</p>
  </div>
</div>
      `.trim(),
    });

    console.log('Contact email sent successfully to:', recipientEmail);
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return false;
  }
}
