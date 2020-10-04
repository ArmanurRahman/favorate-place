export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title) => {
    const id = new Date().toString();
    return { type: ADD_PLACE, id, title };
};
