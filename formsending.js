const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./form-sending/nodemailer");

const app = express();

const PORT = 3001;
let user = undefined;
let i = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/index", (req, res) => {
  if (!req.body.name || !req.body.phone) {
    return res.sendStatus(400);
  }
  i++;
  const messege = {
    to: "elexeeen@gmail.com",
    subject: "Rabotaet",
    html: `<h2>Замовлення №${i}</h2>

    <ol>
      <li>Ім'я: ${req.body.name}</li>
      <li>Номер телефону: ${req.body.phone}</li>
      <li>Тип зв'язку: ${req.body.selectedMessenger}</li>
    </ol>
    `,
  };
  console.log(req.body);
  mailer(messege);
  user = req.body;
  res.redirect("/index");
});
app.get("/index", (req, res) => {
  if (typeof user !== "object") {
    return res.sendFile(__dirname + "/index.html");
  }
  res.sendFile(__dirname + "/index.html");
  user = undefined;
});

app.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}/index`)
);
