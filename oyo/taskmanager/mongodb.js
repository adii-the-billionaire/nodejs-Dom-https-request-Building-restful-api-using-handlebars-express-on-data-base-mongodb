const mongodb = require( 'mongodb' )
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
//here is destructuring something const {MongoClient,objectID} = rquire('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task--manager'
MongoClient.connect( connectionURL, { useNewUrlParser: true }, (error,client) => {
    if ( error ) {
      return  console.log('unable to connect the database')
    }
    const db = client.db( databaseName)
    // db.collection( 'users' ).insertOne( {
    //     _id: new ObjectId(),
    //     name: 'adii',
    //     age:'21'
    // } ).then( ( result ) => {
    //     console.log(result.ops)
    // } ).catch( ( error ) => {
    //     console.log('unbale to addd the data')
    // })
    db.collection( 'users' ).find( { name: 'adii' } ).toArray( ( error, result ) => {
        console.log(result)
    })
    console.log('correctly')

})
