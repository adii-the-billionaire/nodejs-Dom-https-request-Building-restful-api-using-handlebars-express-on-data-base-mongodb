const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require( '../oyo/taskmanager/usermodel' )
const { reset } = require( 'yargs' )

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get( '', ( req, res ) => {
    res.render( 'index', {
        title: 'Weather',
        name: 'Andrew M'
    } )
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})
app.get( '/users/:name', ( req, res ) => {
    const name = req.params.name
    User.find( name ).then( ( result ) => {
        if ( !result ) {
            return res.status(404).send()
        }
        res.send(result)
    } ).catch( ( e ) => {
        res.status(500)
.send()    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})