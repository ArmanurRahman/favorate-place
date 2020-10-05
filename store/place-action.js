import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../Helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });

            const dbResult = await insertPlace(
                title,
                newPath,
                "Dummy address",
                15.6,
                12.3
            );
            console.log(dbResult);
            const id = new Date().toString();

            dispatch({
                type: ADD_PLACE,
                id: dbResult.insertId.toString(),
                title,
                image: newPath,
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACE, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};
