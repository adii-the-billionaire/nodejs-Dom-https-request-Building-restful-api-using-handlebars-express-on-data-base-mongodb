//encrypted password nd hashing password best thing is hashing bcrypt password
const bcrypt = require( 'bcrypt' )
const myFunction = async(password) =>{
    const hashedpasword = await bcrypt.hash( password, 8 )
    console.log( hashedpasword )
    const isMatch = await bcrypt.compare( password, hashedpasword )
    console.log(isMatch)
}
myFunction('himeTyp')