const request = require( 'request' )
//here we have to make something that show info while entering the lattitude and longitude now here the game the starts
const trivi = ( lattitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=e7345041e23388cc1116e5ab47d562b2&query=40.714,-74.006'
    request( { url: url, json: true }, ( error, response ) => {
        if ( error ) {
            callback( 'error in ur connectivity', undefined )
        } else if ( response.body.error) {
            callback('try something else',undefined)
        } else {
            callback( undefined, response.body.location )
        }
    })
}
module.exports = { trivi:trivi }