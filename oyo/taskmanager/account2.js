const nodemailer = require( 'nodemailer' )

const testAccount = async function (email) {
    a = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: a.user,
      pass: a.pass,
    },
     } )
  
  const dia = {
    from: '"Fred Foo 👻" <adiishukla196@gmail.com>', 
    to: email, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>"
} 
  
    let info = await transporter.sendMail( dia )
    console.log( "Message sent: %s", info.messageId );
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
module.exports = testAccount
testAccount( ).catch( ( e ) => {
    console.log(e)
} )





