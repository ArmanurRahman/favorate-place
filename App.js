import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlaceNavigation from "./Navigation/navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PlaceReducer from "./store/place-reducer";
import { init } from "./Helpers/db";

const App = () => {
    init()
        .then(() => {
            console.log("DATABASE INITIALIZED");
        })
        .catch((err) => {
            console.log("INITIALIZE DB FAIL");
            console.log(err);
        });

    const rootReducer = combineReducers({
        place: PlaceReducer,
    });

    const store = createStore(rootReducer, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <PlaceNavigation />
        </Provider>
    );
};

export default App;
