require( './mongoose' )
const User = require( './usermodel' )
// User.findByIdAndUpdate( '5fbc550e89541734387f2d9e', { age: 1 } ).then( ( user ) => {
//     console.log( user )
//     return User.countDocuments( { age: 1 } ).then( ( result ) => {
//         console.log(result)
//     })
// } ).catch( ( e ) => {
//     console.log(error)
// })
// User.findByIdAndUpdate( '5fbc550e89541734387f2d9e', { age: 3 } ).then( ( user ) => {
//     console.log( user )
//     return User.countDocuments({age:3})
// } ).then( ( result ) => {
//     console.log(result)
// } ).catch( ( e ) => {
//     console.log(error)
// })
//here is using of async await is 
const findByIdAndUpdate = async ( id, age ) => {
    const user = await User.findByIdAndUpdate( id, { age } )
    const result = await User.countDocuments( { age } )
    return result
}
findByIdAndUpdate( '5fbc550e89541734387f2d9e', 69 ).then( ( count ) => {
     console.log(count +' the count is')
} ).catch( ( e ) => {
     console.log(e)
 })