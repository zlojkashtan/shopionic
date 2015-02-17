// RECOMMENDED ENVIRONMENT VARIABLES FOR VAGRANT
//
// SENDGRID_USERNAME=my_username
// SENDGRID_PASSWORD=my_password
// FOLDER_PREFIX=/vagrant/
// @reboot /home/ubuntu/.node/bin/forever start -a -e /vagrant/forever-err.log -l /vagrant/forever.log -o /vagrant/forever-out.log -c /usr/bin/node /vagrant/app.js


var express = require('express'),
  app = express(),
  FOLDER_PREFIX = process.env.FOLDER_PREFIX || './',
  nodemailer = require('nodemailer'),
  sgTransport = require('nodemailer-sendgrid-transport'),
  mailOptions = {},
  config = {},
  SENDGRID_USERNAME = process.env.SENDGRID_USERNAME || 'NO_MAIL',
  SENDGRID_PASSWORD = process.env.SENDGRID_PASSWORD || 'NO_PASS',
  CONTACT_REQUEST = 'georg@oceanhouse21.com';

var options = {
  auth: {
    api_user: SENDGRID_USERNAME,
    api_key: SENDGRID_PASSWORD
  }
};

var mailer = nodemailer.createTransport(sgTransport(options));

var sendMail = function (req, res) {
  mailOptions.to = req.param.email + ', ' + CONTACT_REQUEST;
  mailOptions.from = CONTACT_REQUEST;
  mailOptions.subject = 'SHOPIONIC - coming soon ...';
  mailOptions.html = '<h1>Hallo ' + req.param.email + ',</h1><br>Wir halten Dich auf dem Laufenden!<br><br>Das SHOPIONIC Team';
  mailOptions.text = "Bitte nutzen Sie ein modernes Mail-Programm, z.B. Outlook, um den Inhalt dieser Nachricht korrekt darzustellen.";
  if (SENDGRID_USERNAME !== 'NO_MAIL') { // only send when sendgrid is configured
    mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send('Es ist leider ein Fehler aufgetrten. Bitte versuchen Sie die Anfrage erneut');
      } else {
        console.log('Message sent: ' + info.response + '\nto: ' +  mailOptions.to + '\nfrom: +' + mailOptions.subject + '\nhtml: ' + mailOptions.html + '\ntext: ' + mailOptions.text);
        res.status(200).send('Vielen Dank für Ihre Anfrage');
      }
    });
  } else {
    console.log('No email is sent, text would be: ' + mailOptions.html);
    res.status(200).send('Vielen Dank für Ihre Anfrage');
  }
};

app.use(express.static(FOLDER_PREFIX + 'dist'));
app.get('/contact', function(req, res, next) {
  sendMail(req, res);
});

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
});

app.listen(3000);
