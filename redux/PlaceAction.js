import * as FileSystem from 'expo-file-system';
import ENV from '../Env';
import { getPlaces, insertPlaces } from '../helper/db';


export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const addressResponse = await fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${ENV.googleMapApiKey}&mode=retrieveAddresses&prox=${location.latt},${location.long}`);
            console.log('====================================');
            console.log(addressResponse);
            console.log('====================================');
            if(!addressResponse.ok){
                throw new Error('Something Went Wrong');
            }
            const addressResponseData = await addressResponse.json();
            if(!addressResponseData.result){
                throw new Error('Something Went Wrong'); 
            }
            const address = addressResponseData.result[0].formatted_address;
            console.log(address);
            const dbResult = await insertPlaces(title, newPath, address, location.latt, location.long);
            dispatch({
                type: ADD_PLACE,
                place: {id: dbResult.insertId, title, image: newPath, address, coords: {latt: location.latt, long: location.long}}
            })
        }
        catch(err){
            console.log(err);
            throw err;
        }

    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await getPlaces();
            dispatch({type: SET_PLACES, place: dbResult.rows._array})
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}