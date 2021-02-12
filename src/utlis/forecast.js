const request = require('request')
const forecast = (latitude,longitude,callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=ee52f7ae0ca0c1255f41a4087fdd2ed6&query='+latitude+','+longitude+''
    request({url : url,json: true},(error,responce)=>{
if(error){
    callback('Cannot connect to Weather stack api',undefined)
}
else if(responce.body.error){
    callback('Cannot find location',undefined)
}
else{
    callback(undefined,{
    Description : responce.body.current.weather_descriptions[0],
    Temperature : responce.body.current.temperature,
    Precipitation :  responce.body.current.precip
    })
}
 })

}

module.exports = forecast