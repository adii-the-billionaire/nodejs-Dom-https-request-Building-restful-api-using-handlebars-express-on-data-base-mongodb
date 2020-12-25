// const jwt = require( 'jsonwebtoken' )
// const myFunction = async () => {
//     const token = jwt.sign( { _id: 'abc123' }, 'thisismynewcourse' )
//     console.log(token)
// }
// myFunction()
const jwt = require( 'jsonwebtoken' )
const myFunction = async ( { _id }, key ) => {
    const token = jwt.sign( { _id }, key )
    console.log( token )
    const data = jwt.verify( token, 'hibabyimissyou' )
    console.log( data )
    if ( data ) {
        console.log(true)
    }
}
myFunction( 'asfkhf8', 'hibabyimissyou' )
//blood say all this matter so let's rock now 