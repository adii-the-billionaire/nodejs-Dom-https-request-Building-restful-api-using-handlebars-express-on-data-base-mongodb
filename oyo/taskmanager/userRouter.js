require( './mongoose' )
const express = require('express')
const User = require( './usermodel' )
const auth = require( './auth' )
const multer = require( 'multer' )
const sharp = require( 'sharp' )
const {sendWelcomeEmail} = require('./account1')
const router = new express.Router()
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByInfo(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post( '/users/name', async ( req, res ) => {
    try {
        const user = await User.findByName( req.body.name )
        res.send(user)
    } catch ( e ) {
        
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send( req.user )
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth,async (req, res) => {
    try {
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post( '/users/logout', auth, async ( req, res ) => {
    try {
        req.user.tokens = req.user.tokens.filter( ( token ) => {
            return token.token !==req.token
        } )
        await req.user.save()
        res.send()
    } catch ( e ) {
        res.status(500).send()
    }
} )

router.post( '/users/logoutall', auth, async ( req, res ) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status.send()
    } catch ( e ) {
        res.status(500).send()
    }
})


const upload = multer( {
    dest: 'mia',
    limits: {
        fileSize:10000000
    },
    fileFilter( req, file, cb ) {
        if ( !file.originalname.match( /\.(pdf|png|jpg|jpeg)$/ ) ) {
            return cb( new Error( 'please upload a pdf' ),undefined )
        }
            cb( undefined, true )
            //file.originalname.match(/\.(doc|docx)$/)
        
        // if ( !file.originalname.endsWith( '.pdf' ) )
        // cd( new Error( 'file must be a pdf' ) )
        // cd( undefined, true )
        // cd(undefined,false)file.originalname.match(/\.(jpg|jpeg|pdf|png|JPG)$/)
    }
} )
//how to validate a multer
router.post( '/users/me/avatar', upload.single( 'avatar' ), async ( req, res ) => {
    try {
        res.send()
        
    } catch ( e ) {
        res.status(500).send(e)
    }
},( error, req, res, next ) => {
        res.status(400).send({error:error.message})
}) 

router.post( '/users/me/avatar/man', upload.single( 'avatar' ), auth,async ( req, res ) => {
   // req.user.avatar = req.file.buffer
    const buffer = await sharp( req.file.buffer ).resize( { width: 250, height: 250 } ).png().toBuffer()
    req.user.avatar = buffer
    try {
    await req.user.save()
    res.status(200).send()
    } catch ( e ) {
        res.status(500).send()
   }
}, ( error, req, res, next ) => {
        res.status(400).send({error:error.message})
})

router.delete( '/users/me/avatar/man', auth, async ( req, res ) => {
    req.user.avatar = undefined
    res.send()
})

router.get( '/users/me/avatar', auth, async ( req, res ) => {
    try{
        res.set( 'Content-Type', 'image/jpg' )
        res.sen(req.user.avatar)
    } catch ( e ) {
        res.status(500).send(e)
    }
} )

router.get( '/users/:id/avatar', async ( req, res ) => {
    const user = await User.findById( req.params.id )
    if ( !user || !user.avatar ) {
        throw new Error()
    }
    res.set( 'Content-Type', 'image/jpg' )
    res.send(user.avatar)
})

//here is for email route is so let's start think about this
// router.post( ( '/ip', async ( req, res ) => {
//   const user = new User(req.body)
//     try {
//         await user.save()
//         // sendWelcomeEmail(user.email)
//        res.status(201).send(user)
//     } catch ( e ) {
//         console.log(e)
//         res.status(404).send(e)
//    }
   
// }))

module.exports = router
//accepting authentication tokens so here is it is very complicated topics of the era
//an express middlewarefunction