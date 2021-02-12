const request = require("request")
const geocode = (address,callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ292YXJkaGFuMjIiLCJhIjoiY2tqbzZ1N3BwMnR0bTJ6bG8zZmI2ZHBtZCJ9.0qGwI729fBvd2aHCEvQbIg&limit=1'
    // The encodeURIComponent() function encodes a URI by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).
    request({url : URL,json : true},(error,response)=>{
    if(error){
        callback('Unable to Connect to Location services !',undefined)
    }
    else if(response.body.message){
        callback('Unable to find location',undefined)
    }
    else{
       callback(undefined,{
           latitude : response.body.features[0].center[0],
           longitude : response.body.features[0].center[1],
           location : response.body.features[0].place_name,
       })
    }
    
    })
    
    }
    
    module.exports = geocode