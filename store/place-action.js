import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../Helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, image, location) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleMapApiKey}`,

            {
                method: "GET",
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const resData = await response.json();
        if (!resData.results) {
            throw new Error("Something went wrong");
        }
        console.log(resData);
        const address = resData.results[0].formatted_address;
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
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);
            const id = new Date().toString();

            dispatch({
                type: ADD_PLACE,
                id: dbResult.insertId.toString(),
                title,
                image: newPath,
                address,
                lat: location.lat,
                lng: location.lng,
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
