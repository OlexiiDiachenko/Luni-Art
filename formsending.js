const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./form-sending/nodemailer.js");

const app = express();

// const PORT = "127.0.0.1:5500";
let user = undefined;

app.use(bodyParser.urlencoded({ extended: false }));
app.post("https://olexiidiachenko.github.io/Luni-Art", (req, res) => {
  if (!req.body.name || !req.body.phone) {
    return res.sendStatus(400);
  }
  const message = {
    // to: "forolun@gmail.com",
    to: "elexeeen@gmail.com",
    subject: "Rabotaet",
    html: `
    <h2>Замовлення №1</h2>

    <ol>
      <li>Ім'я: ${req.body.name}</li>
      <li>Номер телефону: ${req.body.phone}</li>
      <li>Тип зв'язку: ${req.body.contact}</li>
    </ol>
    `,
  };
  console.log(req.body);
  mailer(message);
  user = req.body;
  res.redirect("https://olexiidiachenko.github.io/Luni-Art");
});
app.get("https://olexiidiachenko.github.io/Luni-Art/", (req, res) => {
  if (typeof user !== "object") {
    return res.sendFile("https://olexiidiachenko.github.io/Luni-Art/");
  }
  res.send("Регистрация прошла успешно");
  user = undefined;
});

// app.listen(PORT, () => console.log(`server listening at http://${PORT}/index`));
