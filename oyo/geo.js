const request = require( 'request' )
const lati = require('./htt.js')
const geocode = ( address, callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent( address ) + '.json?access_token=pk.eyJ1IjoiYWRpaTkyMTEiLCJhIjoiY2thMnZuZzVtMDl6bTNsbDltdWxhb3hiNCJ9.ICY41kHrOosFrenKb2thbg'
    request( { url: url, json: true }, ( error, response ) => {
        if ( error ) {
            callback('unable to connect the location service',undefined)
        } else 
            if ( response.body.features.length === 0 ) {
                callback('unable to finde the locatio try another search',undefined)
            } else {
                callback( undefined, {
                    lattiude: response.body.features[ 0 ].center[ 0 ],
                    longitude: response.body.features[ 0 ].center[ 1 ],
                    location:response.body.features[0].place_name
                    
                    
                })
            }
    })
}
geocode( 'India', ( error, data ) => {
    console.log( 'Error', error )
    console.log('Data',data)
} )
lati.trivi( 40.71, -74.01, ( error, data ) => {
    console.log( 'Error', error )
    console.log('Data',data)
})
