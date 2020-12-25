const mongoose = require( 'mongoose' )
const bcrypt = require('bcrypt')
const validator = require( 'validator' )
const task = require('./taskmodel')
const jwt = require('jsonwebtoken')
const Task = require( './taskmodel' )
const userSchemas = new mongoose.Schema( {
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        validate( value ) {
            if ( value < 0 ) {
                throw new Error( 'age must be greater than 1' )
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique:true,
        validate( value ) {
            if ( !validator.isEmail( value ) ) {
                throw new Error( 'email must be in proper form' )
            }
        }
    },
    password: {
        type: String,
        trim: true,
        validate( value ) {
            if ( value === 'password' ) {
                throw new Error( 'must be greater than 6 word nd not value passowerd' )
            } if ( value.length < 6 ) {
                throw new Error( 'must be grater than 6' )
            }
        }
    },
    tokens: [ {
        token: {
            type: String,
            required:true
        }
    } ],
    avatar: {
        type:Buffer
    }
}, {
        timestamps:true
})

//in mongooose schemas we just passing single argument nw passing the another document that is timestamps
//virtual property it's just realtionship btween user and task
userSchemas.virtual( 'tasks', {
    ref: 'Task',
    localField: '_id',
foreignField:'owner'
})

userSchemas.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchemas.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign( { _id: user._id.toString() }, 'thisisIndia' )
    user.tokens = user.tokens.concat( { token } )
    await user.save()
    console.log(token)
    return token
}

userSchemas.statics.findByInfo = async ( email, password ) => {
    const user = await User.findOne( { email } )
    if ( !user ) {
        throw new Error('plz check ur email')
    }
    const isMatch = await bcrypt.compare( password, user.password )
    console.log(isMatch)
    if ( !isMatch ) {
        throw new Error('u r our user but plz type correct password')
    }
    console.log(isMatch)
    console.log(user)
   return user 
} 

userSchemas.statics.findByName = async ( name ) => {
    const user = await User.find( { name } )
    if ( !user ) {
        throw new Error('unbael to get')
    }
    return user
}
userSchemas.pre( 'save',  async function( next ) {
    const user = this
    console.log(user.password)
    console.log( 'hiiii i b' )
    if ( user.isModified( 'password' ) ) {
        user.password = await bcrypt.hash( user.password, 8 )
    }
    console.log(user.password)
    next()
} )

//delete user tasks when user is removed
userSchemas.pre( 'remove', async function ( next ) {
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model( 'User', 
 userSchemas)
module.exports = User


