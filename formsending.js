const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./form-sending/nodemailer");

const app = express();

const PORT = 3001;
let user = undefined;

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/index", (req, res) => {
  if (!req.body.name || !req.body.phone) {
    return res.sendStatus(400);
  }
  const message = {
    to: "forolun@gmail.com",
    subject: "Rabotaet",
    ht: "Congratulations",
  };
  mailer(message);
  user = req.body;
  res.redirect("/index");
});
app.get("/index", (req, res) => {
  if (typeof user !== "object") {
    return res.sendFile(__dirname + "/index.html");
  }
  res.send("Регистрация прошла успешно");
  user = undefined;
});

app.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}/index`)
);
