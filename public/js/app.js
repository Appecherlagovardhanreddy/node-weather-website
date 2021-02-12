

// fetch api  runs in browser  
// then is the return value of fetch

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
            console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=anantapur').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const search = document.querySelector('form')
const loc = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')



search.addEventListener('submit',(e)=>{
    e.preventDefault()
    const area = loc.value
     
    message1.textContent = 'Loading..'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + area).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
            message1.textContent = data.error
            }
            else{
               message1.textContent = data.location
               message2.textContent = data.forecast.description
            
            }
        })
    })
})
    
 
