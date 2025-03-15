const axios = require("axios");
const {metreToKilometer,convertTime }= require("../utils/utils.js")
const {getDistanceTime,getSuggestions} = require("../services/maps.service")

const getCoordinates = async(req,res)=>{
    const {address} =req.query;
    console.log("Address:",address);

    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    format: "json",
                    q: address,
                },
            }
        )

        return res.json({
            latitude: response.data[0].lat,
            longitude: response.data[0].lon,
            address: response.data[0].display_name,
        });
    } catch (error) {
        console.error("Error fetching data from Nominatim",error);
        return res.status(500).json({error:"Internal server Error"});
    }

}

const getDistanceTimeController = async(req,res)=> {
 const {origin,destination} =req.query;

//  console.log("Origin",origin);
//  console.log("Destination",destination);
const distanceTime = await getDistanceTime(origin,destination);


// console.log("Distance ",distanceTime.routes[0].distance);
// console.log("Time ",distanceTime.routes[0].duration);

    const distance = distanceTime.routes[0].distance;
    const duration = distanceTime.routes[0].duration;

    return res.status(200).json ({
        distance:{
            text: metreToKilometer(distance),
            value:distance
        },
        duration:{
            text: convertTime(duration),
            value: duration
        }
    })
}

const getSuggestionsController= async(req,res)=> {
     const {input} =req.query;
    //  console.log(input);
   const suggestions= await getSuggestions(input);
   const suggestionsArray = suggestions.map((suggestion) =>( {
    name: suggestion.display_name,
   }));
   return res.status(200).json(suggestionsArray);

}

module.exports={
    getCoordinates,
    getDistanceTimeController,
    getSuggestionsController
}
 