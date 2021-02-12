
const  express = require('express')
// express is a function
const geocode = require("./utlis/geocode")
const forecast = require("./utlis/forecast")

const path = require('path')
// console.log(__dirname)
// console.log(__filename)

const hbs = require('hbs')
const { response } = require('express')

// .. refers to upper files
const publicpath = path.join(__dirname,'../public')
// if view in set out of src folder
//  const viewspath = path.join(__dirname,'../templates')
const partialspath = path.join(__dirname,'/views/partials')

const app = express()

app.set('view engine', 'hbs')
// setting handle bars

// app.set('views',viewspath)  if view in set out of src folder

hbs.registerPartials(partialspath)

// set up ststic directory
app.use(express.static(publicpath))

app.get('',(req,response)=>{
    response.render('index',{
       title : 'weather - app',
        name : 'Govardhan Reddy',
    })
})

// app.get('',(req,response)=>{

//     response.send('<h1> Weather </h1>')
// })

// const helphtml = path.join(__dirname,'../public/help')

// app.get('/help',(req,response)=>{
// response.send([{
//     name : 'Govardhan',
//     age : 19
// }])

app.get('/help',(req,response)=>{
    response.render('help',{
        title : 'Help',
        name : '@website_rockers',
    })
})

// })
// app.get('/about',(req,response)=>{
//     response.send('<h1>About ,</h1>')
// })

app.get('/about',(req,response)=>{
    response.render('about',{
        title : 'About @website_rockers',
        name : 'Govardhan Reddy',
    })
})

app.get('/weather',(req,response)=>{
    if(!req.query.address){
        return response.send({
            "error" : "Hey..We like to provide you weather forecast .Pls do come up with your location",
        })
    }
      geocode(req.query.address,(e,{latitude,longitude,location}={})=>{
          if(e){
              return response.send({e})
          }
          forecast(latitude,longitude,(e,forecastdata)=>{
            if(e){
               return response.send({e})
            }
            response.send({
                forecast :forecastdata,
                location,
                address : req.query.address,
            })
          })

      })
   

})

app.get('/products',(req,response)=>{
   if(!req.query.search){
      return    response.send({
              error : 'You must provide search term',
          })
   }
// if no search is provide return will stop function here only
    console.log(req.query.search)
    response.send({
        products : [],
    })

})



app.get('*',(req,response)=>{
    response.render('404')
})
// * every thing other than mentioned 

// app.com
// app.com/help
// app.com/about

app.listen(3000,()=>{
    console.log("Runing on port 3000")
})