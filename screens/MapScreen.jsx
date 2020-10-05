import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

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

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
});

export default MapScreen;
