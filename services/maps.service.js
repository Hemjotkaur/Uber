// const { getCoordinates } = require("../controllers/map.controller")

const axios = require("axios");

const getCoordinates = async(address) => {
   
   try{
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    const response = await axios.get(url);
    console.log("Response: ", response.data);
   
    if( response.data.length === 0){
        throw new Error("No coordinates found for the given address");
    }

    return{
        lat: response.data[0].lat,
        lon: response.data[0].lon,
    }


   } catch(error) {
        console.error("Error fetching coordinates: ",error);
        throw error;
    }
}

const getDistanceTime = async(origin,destination) => {
    try{
        const originCoordinates = await getCoordinates(origin);
        const destinationCoordinates = await getCoordinates(destination);

        // console.log("Origin Coordinates: ", originCoordinates);
        // console.log("Destination Coordinates: ", destinationCoordinates);
    
        const url =`https://router.project-osrm.org/route/v1/driving/${originCoordinates.lon},${originCoordinates.lat};${destinationCoordinates.lon},${destinationCoordinates.lat}?overview=false`;
        const response = await axios.get(url);
        return response.data;
    }
    catch(error){
        console.error("Error fetching distance and time: ",error);
        throw error;
    }
}

module.exports = {
    getCoordinates,
    getDistanceTime
};