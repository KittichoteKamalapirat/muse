import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject, html: string) {
  // horm's site grounded
  // const transporter = nodemailer.createTransport({
  //   // site ground from hormchocoalte
  //   host: "gsgp1008.siteground.asia",
  //   port: 465, // somehow 465 as mentioned in the siteground does not work if secure = false, but 587 works
  //   secure: true, // secure  false with 565 does not work
  //   auth: {
  //     user: "noreply@hormchocolate.com",
  //     pass: "Chain123--",
  //   },
  //   // add this since we're not the real host, don't reject us!
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // cookknow's namecheap
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465, // 465 is for SSL, can't be 587 which is for TLS
    secure: true, // secure  false with 565 does not work
    auth: {
      user: "hello@cookknow.com",
      pass: "chain123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"🍳 Cookknow" <hello@cookknow.com>', // sender address has to match auth.secure above
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
}
