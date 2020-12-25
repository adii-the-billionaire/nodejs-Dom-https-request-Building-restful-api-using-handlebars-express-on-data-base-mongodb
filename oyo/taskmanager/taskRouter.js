const express = require( 'express' )
const Task = require( './taskmodel' )
const router = new express.Router()
const auth = require('./auth')
const { findById, findOneAndDelete } = require( './taskmodel' )
const User = require( './usermodel' )
router.post( '/tasks', auth,async ( req, res ) => {
    const task = new Task( {
        ...req.body,
owner:req.user._id
    })
    try {
        await task.save()
        res.status(200).send(task)
    } catch ( e ) {
        res.status(404).send(e)
    }
} )
router.get( '/tasks/:id',auth, async ( req, res ) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne( {_id,onwer:req.user._id})
        if ( !task ) {
            return res.status(404).send(e)
        }
        res.send(task)
    } catch ( e ) {
      res.status(500).send()  
    }
} )

//here is method for query string 
//GET/task?completed=false
router.get( '/tasks', auth, async ( req, res ) => {
   
    const match = {}
    if ( req.query.completed ) {
        match.completed = req.query.completed ==="true"
    }
    const sort = {}
    if ( req.query.sortBy ) {
        const parts = req.query.sortBy.split( ':' )
        sort[parts[0]] = parts[1] ==='desc'?-1:1
    }
    // completed = req.query.completed
    // limit =parseInt(req.query.limit)
    try {
        // const task = await Task.find( { owner: req.user._id,match} )
        await req.user.populate( {
            path: 'tasks', match,
            options: {
                limit: parseInt( req.query.limit ),
                skip: parseInt( req.query.skip ),
                sort
            }
         }).execPopulate()
        // res.send({task:task.findByQuery})
        res.send(req.user.tasks)
       
    } catch ( e ) {
        console.log(e)
        res.status(500).send()
  }
} )

router.patch( '/tasks/:id', auth, async ( req, res ) => {
    const updates = Object.keys( req.body )
    const allowedUpdates = [ 'description', 'completed' ]
    const isValidOperation = updates.every( ( update ) => {
        return allowedUpdates.includes(update)
    } )
    if ( !isValidOperation ) {
        return res.status(400).send({error:'Invalid updates'})
    }
    try {
        const task = await findOne( { _id: req.params.id, owner: req.user._id } )
        if ( !task ) {
            return res.status(404).sedn()
        }
        updates.forEach( ( update ) => {
            task[update]=req.body[update]
        } )
        await task.save()
        res.send(task)
    } catch ( e ) {
        
    }
} )

router.delete( '/tasks/:id', auth, async ( req, res ) => {
    try {
       const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id}) 
    } catch ( e ) {
        res.status(500).send(e)
    }
})

module.exports = router

