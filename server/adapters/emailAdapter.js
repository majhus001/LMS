// adapters/emailAdapter.js
const nodemailer = require("nodemailer");

// 🔹 Abstract Interface
class EmailAdapter {
  async sendEmail(to, subject, text) {
    throw new Error("sendEmail() must be implemented");
  }
}

// 🔹 Concrete Adapter
class NodemailerAdapter extends EmailAdapter {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to, subject, text) {
    return await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }
}

module.exports = new NodemailerAdapter();