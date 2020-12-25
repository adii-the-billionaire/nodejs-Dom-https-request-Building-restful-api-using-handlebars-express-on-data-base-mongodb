const express = require( 'express' )
const path = require('path')
const app = express()
// const pb = path.join( __dirname, './public' )
// app.use( express.static( pb ) )
app.set('view engine','hbs')
app.get( '', ( req, res ) => {
      // res.send('<h1>hiiiiii</h1>')
      res.render('index')
} )
app.get( '/product', ( req, res ) => {
      console.log(req.query.rating)
      res.send( {
            porduct:[]
      })
})
app.listen( 3000, () => {
      console.log('server is up on port 3000')
  })