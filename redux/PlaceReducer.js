import { Place } from "../model/Place"
import { ADD_PLACE, SET_PLACES } from "./PlaceAction"

let initialState = {
    places : []
}

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(action.place.id.toString(), action.place.title, action.place.image, action.place.address, action.place.coords.latt, action.place.location.long);
            return {
                places : state.places.concat(newPlace)
            }
        case SET_PLACES: 
            const loadPlace = action.place.map(item => new Place(item.id.toString(), item.title, item.imageURI, item.address, item.latt, item.long));
            return {
                places: loadPlace
            }
        default:
            return state;
    }
}

export default placeReducer;