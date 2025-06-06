const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  }
});

// Send support/contact message
async function sendSupportMessage({ name, email, subject, message }) {
  const mailOptions = {
    from: email,
    to: process.env.SUPPORT_EMAIL,
    subject: `Support Request: ${subject}`,
    html: `
      <h3>Support Message from ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    `,
  };
  return transporter.sendMail(mailOptions);
}

// Send order confirmation
async function sendOrderConfirmation(to, orderSummaryHTML) {
  const mailOptions = {
    from: `"Records4Store" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: 'Your Order Confirmation',
    html: orderSummaryHTML,
  };
  return transporter.sendMail(mailOptions);
}

// (Optional) Other types later
// async function sendPasswordReset(to, resetLink) { ... }

module.exports = {
  sendSupportMessage,
  sendOrderConfirmation,
};
