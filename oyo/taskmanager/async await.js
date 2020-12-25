//async function always return promise

 //here is making promise function
const add = ( a, b ) => {
    return new Promise(( resolve, reject )=> {
        setTimeout( () => {
            if ( a < 0 || b < 0 ) {
            return reject('Numbers must be positive')
            }
            resolve(a+b)
    },2000)
     })
}
const doWork = async () => {
    const sum = await add( 8, 9 )
    const sum1 = await add( sum, 9 )
    const sum2 = await add( sum1, 9 )
    const sum3 = await add( sum2, 9 )
  return sum3
}
doWork().then( ( result ) => {
    console.log('result is ' + result)
} ).catch( ( e ) => {
    console.log('error '+ e)
} )
//herer promise chaining without using async and await so let's start this
const addi = ( a, b ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => {
            if ( a < 0 || b < 0 ) {
                return reject('Error number must be positive')
            }
            resolve(a+b)
        },2000);
    }) 
}
addi( 4, 5 ).then( ( sum ) => {
    console.log( sum )
    return addi( sum, 9 ).then( ( sum2 ) => {
        console.log( sum2 )
        return addi( sum2, 8 ).then( ( sum3 ) => {
            console.log( sum3 )
            return addi( sum3, 9 ).then( ( sum4 ) => {
                console.log(sum4)
            })
        })
    })
} ).then( ( e ) => {
    console.log('error '+ e)
})