const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.ukr.net",
    port: 465,
    secure: true, // true for 465 port only!
    auth: {
      user: "luniart@ukr.net",
      pass: "q057QaZBKbdqFTOT",
    },
  },
  {
    from: "Order Mail <luniart@ukr.net>",
  }
);

transporter.verify((error, success) => {
  error
    ? console.log(error)
    : console.log("Server is ready to take our messages");
});
const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return res.sendFile(__dirname + "/index.html");
    console.log("Email sent: ", info);
  });
};

module.exports = mailer;
