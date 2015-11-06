var nodemailer = require('nodemailer');

module.exports = {
  sendEmail: function(req, res) {
    data = {
      fistName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      comment: req.body.comment
    };
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'apptestppa@gmail.com',
            pass: '1apptestppa1'
        }
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Me ✔ <apptestppa@gmail.com>', // sender address
        to: 'apptestppa@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: JSON.stringify(data), // plaintext body
        html: '<b>' + JSON.stringify(data) + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.send('message sent: ' + info.response);

    });
  }
}






