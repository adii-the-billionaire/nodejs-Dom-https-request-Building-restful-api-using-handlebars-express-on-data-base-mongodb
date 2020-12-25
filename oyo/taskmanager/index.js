const express = require( 'express' )
require( './mongoose' )
const bcrypt = require( 'bcrypt' )
const taskRouter = require('./taskRouter')
const routerUser = require( './userRouter' )
const app = express()
app.use( express.json() )
app.use( routerUser )
app.use(taskRouter)
const port = process.env.PORT 

const User = require( './usermodel' )
const {mia} = require('./account2')
app.post( '/ip', async ( req, res ) => {
    const user = new User( req.body )
    try {
        await user.save()
        mia(user.email)
         res.send(user)
      
    } catch ( e ) {
        res.send(e)
    }
})

const multer = require( 'multer' )
const upload = multer( {
    dest:'images'
} )
app.post( '/upload',upload.single('upload'), ( req, res ) => {
    res.send()
})

app.listen( port, () => {
    console.log('Server is up on port'+ port)
} )
//how to split files in our application so  let's start
//make router file of user nd task split them
//here is another problems for populating one model to another so let's start
// const User = require('./usermodel')
// const Task = require( './taskmodel' )
// const main = async () => {
//     // const task = await Task.findById( '5fc28aff22c47c35903b71a6' )
//     // await task.populate('owner').execPopulate()
//     // console.log( task )
//     // console.log(task.owner)
//     const user = await User.findById( '5fc14e65a81e302cf4a09a98' )
//     console.log( user )//how to user have document of task by creating a virtual schemas
//     await user.populate('tasks').execPopulate()
// }
// main()
