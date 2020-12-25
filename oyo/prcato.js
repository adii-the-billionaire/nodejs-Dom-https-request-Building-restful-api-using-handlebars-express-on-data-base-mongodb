const fs =require('fs')
const obj = {
    book: "m",
    authror:"j"
}
// const objJSON = JSON.stringify( obj )
// fs.writeFileSync('1.json',objJSON)
const dataBuffer = fs.readFileSync( '1.json' )
console.log(dataBuffer)
const dataJson = dataBuffer.toString()
console.log( dataJson )
const data  = JSON.parse(dataJson)
console.log( data )
//how to parse something that is gud
/// you have a bunch of people want to come join the party whose name is starts with an Alphabet A
const obje = {
    name: [ 'a', 'ani', 'ali', 'di' ],
    handle(){
        
    }
}
obje.handle()
//how to know first string of the length

const name = [ 'riya', 'ti', 'xi' ]
console.log(name[0])
