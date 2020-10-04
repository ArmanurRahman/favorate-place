import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlaceNavigation from "./Navigation/navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PlaceReducer from "./store/place-reducer";

const App = () => {
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
