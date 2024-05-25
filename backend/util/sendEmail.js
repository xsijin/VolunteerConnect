const nodemailer = require("nodemailer");
// const dayjs = require("dayjs");

module.exports = {
  sendEmail,
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = (obj) => {
  const { randomPassword } = obj.payload;
  switch (obj.type) {
    case "registration":
      return {
        subject: "Registration Successful",
        text:
          `The results of your volunteer score is in.\n\n` +
          `Use this randomly generated password to access your profile:\n` +
          `${randomPassword}\n\n` +
          `Access below URL and login:\n` +
          `${process.env.FRONTEND_URL}/\n\n` +
          `Best regards,\n` +
          `VolunteerConnect Team`,
      };
  }
};

async function sendEmail(obj) {
  const mail = mailOptions(obj);
  const info = await transporter.sendMail({
    from: '"Volunteer Connect" <noreply@volunteerconnect.org>',
    to: obj.payload.userEmail,
    subject: mail.subject,
    text: mail.text,
  });
  console.log(info);
}
