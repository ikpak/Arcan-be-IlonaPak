var express = require("express");
var router = express.Router();

const sgMail = require("@sendgrid/mail");
function html(cat, name, mess) {
  let temp = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <h1>cate: ${cat}</h1>
      <h1> ]name : ${name} </h1>
      <p>${mess}</p> 
  </body>
  </html>`;
  return temp;
}
/* GET home page. */
router.post("/test", function (req, res, next) {
  try {
    const { name, email, category, subject, message } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: ["inkha@yopmail.com", "pak@yopmail.com"],
      from: email,
      subject: subject,
      // text: `category: ${category} \n
      // name: ${name} \n
      // body: ${message}`,
      html: html(category, name, message),
    };
    sgMail.send(msg);
    // res.render('index', { title: 'Express' });
    res.send("okkkk");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
