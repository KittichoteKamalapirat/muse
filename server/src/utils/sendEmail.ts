import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccoint", testAccount);

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // name: "cookkknow.com",
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: "mhmx33r57yu6whhp@ethereal.email", // generated ethereal user
    //   pass: "DfeVsHJSpTmhrb5kxP", // generated ethereal password
    // },

    // site ground from hormchocoalte
    host: "gsgp1008.siteground.asia",
    port: 465, //somehow 465 as mentioned in the siteground does not work if secure = false, but 587 works
    secure: true, //secure  false with 565 does not work
    auth: {
      user: "noreply@hormchocolate.com",
      pass: "Chain123--",
    },
    // add this since we're not the real host, don't reject us!
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("trying to send email");
  try {
    let info = await transporter.sendMail({
      from: '"Cookknow 👻" <noreply@hormchocolate.com>', // sender address
      to: to, // list of receivers
      subject: "Change password ✔", // Subject line
      html: html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
}
