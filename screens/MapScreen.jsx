import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Color from "../contants/color";

const MapScreen = (props) => {
    const [markedCordinates, setMarkedCordinates] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = (event) => {
        setMarkedCordinates({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    };

    let cordinates;
    if (markedCordinates) {
        cordinates = {
            latitude: markedCordinates.lat,
            longitude: markedCordinates.lng,
        };
    }
    const saveLocation = useCallback(() => {
        if (!markedCordinates) {
            return;
        }
        props.navigation.navigate("newPlace", {
            selecdedPlace: markedCordinates,
        });
    }, [markedCordinates]);

    useEffect(() => {
        props.navigation.setParams({ saveFunction: saveLocation });
    }, [saveLocation]);

    return (
        <MapView
            region={mapRegion}
            style={styles.mapView}
            onPress={selectLocationHandler}
        >
            {cordinates && (
                <Marker
                    title='Picked location'
                    coordinate={cordinates}
                ></Marker>
            )}
        </MapView>
    );
};

MapScreen.navigationOptions = (navData) => {
    const saveFn = navData.navigation.getParam("saveFunction");
    return {
        headerRight: () => (
            <TouchableOpacity style={styles.saveButton} onPress={saveFn}>
                <Text style={styles.buttomText}>Save</Text>
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
    saveButton: {
        marginHorizontal: 20,
    },
    buttomText: {
        color: Platform.OS === "android" ? "white" : Color.primary,
    },
});

export default MapScreen;
