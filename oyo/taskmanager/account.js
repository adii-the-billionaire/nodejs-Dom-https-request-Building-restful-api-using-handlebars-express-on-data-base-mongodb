const nodemailer = require( 'nodemailer' )
//here is for what about destructuring of nodemaileer
const {createTestAccount,createTransport} = nodemailer
//Generate SMTP service account from ethereal.email

createTestAccount(function ( err, account ){
   
    if ( err ) {
        console.error('Failed to create a testing account ' +err.message)
    }
    console.log( 'Credentials obtained, sending message...' );
    // console.log( account.smtp.host ) 
    // console.log( account.smtp.port )
    // console.log( account.smtp.secure )
    // console.log( account.user )
    console.log(account.pass)
   createTransport( {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
  } )
    
    
} )
 
// nodemailer.createTestAccount( ( err, account ) => {
//     if ( err ) {
//         console.error( 'Failed to create a testing account. ' + err.message );
//         return process.exit( 1 );
//     }

//     console.log( 'Credentials obtained, sending message...' );

//     //Create a SMTP transporter object
//     let transporter = nodemailer.createTransport( {
//         host: account.smtp.host,
//         port: account.smtp.port,
//         secure: account.smtp.secure,
//         auth: {
//             user: account.user,
//             pass: account.pass
//         }
//     } );

//     // Message object
   

   
// } )



 let message = {
        from: 'Sender Name <adiishukla196@gmail.com>',
        to: 'Recipient <blueiyerish@gmail.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };
    createTestAccount.sendMail( message, ( err, info ) => {
        if ( err ) {
            console.log( 'Error occurred. ' + err.message );
            return process.exit( 1 );
        }

        console.log( 'Message sent: %s', info.messageId );
        // Preview only available when sending through an Ethereal account
        console.log( 'Preview URL: %s', nodeMailer.getTestMessageUrl( info ) );
    } )