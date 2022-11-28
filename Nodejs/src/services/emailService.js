require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Việt Nam Thu Gom 👻" <vietnamcollects@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "✔️ Xác Nhận Đặt Lịch Thu Gom", // Subject line
    html: `
        <h3>Xin chào ${dataSend.giverName} !</h3>
        <h3>Bạn nhận được email này vì đã đặt lịch thu gom trên Việt Nam Thu Gom</h3>
        <h3>Thông tin đơn thu gom gồm: </h3>
        <h4>Sản phẩm thu gom: ${dataSend.productName}</h4>
        <h4>Thu gom từ ngày: ${dataSend.dateName} - Thời gian:${dataSend.timeName}</h4>
        <h4>Số lượng: ${dataSend.amountName}</h4>
        <h4>Địa chỉ: ${dataSend.addressName}</h4>
        <p><h3>Xin chân thành cảm ơn 😍 </h3></p>
        `, // html body
  });
};

let sendEmailForgotPassword = async (dataSend) => {
  console.log(dataSend);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Việt Nam Thu Gom 👻" <vietnamcollects@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Reset PassWord", // Subject line
    html: `
        <h3>Xin chào !</h3>
        <h3>Bạn nhận được email này vì đã xác nhận quên mật khẩu , yêu cầu cấp lại mật khẩu mới </h3>
        <h4>Mật khẩu mới: ${dataSend.newPassword}</h4>
        <p><h3>Xin chân thành cảm ơn 😍 </h3></p>
        `, // html body
  });
};

module.exports = {
  sendEmail: sendEmail,
  sendEmailForgotPassword: sendEmailForgotPassword,
};
