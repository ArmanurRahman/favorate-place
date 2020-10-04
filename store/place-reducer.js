import { ADD_PLACE } from "./place-action";
import Place from "../models/Place";

const initializeState = {
    places: [],
};

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(action.id, action.title);
            return { ...state, places: state.places.concat([newPlace]) };
        default:
            return state;
    }
};

export default reducer;
