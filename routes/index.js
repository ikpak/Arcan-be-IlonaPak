var express = require("express");
var router = express.Router();
const moment = require("moment");

const sgMail = require("@sendgrid/mail");

function contactHtml(cat, name, mess) {
  let temp = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <div><b>Category:</b> ${cat}</div>
      <div><b>Name:</b> ${name} </div>
      <p><b>Enquiry:</b> ${mess}</p> 
  </body>
  </html>`;
  return temp;
}

function bookHtml(
  name,
  phone,
  organization,
  pageUrl,
  dateOne,
  dateTwo,
  startTime,
  endTime,
  capacity,
  title,
  description
) {
  let temp = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
    </style>
    <body>
        <div><b>Name:</b> ${name} </div>
        <div><b>Phone No.:</b> ${phone}</div>
        <br/>
        <div><b>Organization:</b> ${organization}</div>
        <div>${pageUrl}</div>
        <br/>
        <div><b>Preferred Dates:</b> ${moment(dateOne).format(
          "LL"
        )} or ${moment(dateTwo).format("LL")}</div>
        <div><b>Duration:</b> From ${startTime} To ${endTime}</div>
        <div><b>Expected No. of Guests:</b> ${capacity}</div>
        <br/>
        <div><b>Event Name:</b> ${title}</div>
        <div><b>Short Description:</b> ${description}</div>
    </body>
    </html>`;

  return temp;
}

/* GET home page. */
router.post("/contact", function (req, res, next) {
  try {
    const { name, email, category, subject, message } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: ["inkha.pak@gmail.com"],
      from: email,
      subject: subject,
      html: contactHtml(category, name, message),
    };
    sgMail.send(msg);
    // res.render('index', { title: 'Express' });
    res.send("okkkk");
  } catch (err) {
    res.send(err);
  }
});

router.post("/book", function (req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      organization,
      pageUrl,
      dateOne,
      dateTwo,
      startTime,
      endTime,
      capacity,
      title,
      description,
    } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: ["inkha.pak@gmail.com"],
      from: email,
      subject: "Booking Request",
      html: bookHtml(
        name,
        phone,
        organization,
        pageUrl,
        dateOne,
        dateTwo,
        startTime,
        endTime,
        capacity,
        title,
        description
      ),
    };
    sgMail.send(msg);
    // res.render('index', { title: 'Express' });
    res.send("okkkk");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
