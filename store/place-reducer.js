import { ADD_PLACE, SET_PLACE } from "./place-action";
import Place from "../models/Place";

const initializeState = {
    places: [],
};

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.id,
                action.title,
                action.image,
                action.address,
                action.lat,
                action.lng
            );
            return { ...state, places: state.places.concat([newPlace]) };

        case SET_PLACE:
            const places = action.places.map(
                (item) =>
                    new Place(item.id.toString(), item.title, item.imageUri)
            );
            return {
                ...state,
                places: places,
            };
        default:
            return state;
    }
};

export default reducer;
