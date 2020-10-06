import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Color from "../contants/color";
import MapPreview from "./MapPreview";

const LoacationPicker = (props) => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const mapPickedLocation = props.navigation.getParam("selecdedPlace");

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            props.onLocationSelected(mapPickedLocation);
        }
    }, [mapPickedLocation]);
    const verifyPermission = async () => {
        const permited = await Permissions.askAsync(Permissions.LOCATION);
        if (permited.status !== "granted") {
            Alert.alert(
                "Insufficant Permission",
                "You need to grant location permission to use this app!",
                [{ text: "Ok" }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        setIsLoading(true);
        try {
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            props.onLocationSelected({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            console.log(location);
        } catch (err) {
            console.log(err);
            Alert.alert(
                "Could not fetch location",
                "Please try again later or pick a location on the map",
                [{ text: "Ok" }]
            );
        }
        setIsLoading(false);
    };

    const selectLocationHandler = () => {
        props.navigation.navigate("map");
    };
    return (
        <View style={styles.LocationPicker}>
            <TouchableOpacity
                style={styles.LocationPreview}
                onPress={selectLocationHandler}
            >
                <MapPreview
                    style={styles.LocationPreview}
                    location={pickedLocation}
                >
                    {isLoading ? (
                        <ActivityIndicator size='large' color={Color.primary} />
                    ) : (
                        <Text>No map selected</Text>
                    )}
                </MapPreview>
            </TouchableOpacity>

            <View style={styles.button}>
                <Button
                    title='Get User Location'
                    color={Color.secondary}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Select Location'
                    color={Color.secondary}
                    onPress={selectLocationHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    LocationPicker: {},
    LocationPreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    button: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default LoacationPicker;
