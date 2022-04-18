import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    // site ground from hormchocoalte
    host: "gsgp1008.siteground.asia",
    port: 465, // somehow 465 as mentioned in the siteground does not work if secure = false, but 587 works
    secure: true, // secure  false with 565 does not work
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
    const info = await transporter.sendMail({
      from: '"🧑‍🍳 Cookknow 🍳" <noreply@hormchocolate.com>', // sender address
      to, // list of receivers
      subject: "Change password ✔", // Subject line
      html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
}
