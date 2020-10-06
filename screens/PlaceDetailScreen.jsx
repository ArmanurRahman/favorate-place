import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import Colors from "../contants/color";

const PlaceDetailScreen = (props) => {
    const placeId = props.navigation.getParam("id");
    const selectedPlace = useSelector((state) =>
        state.place.places.find((pl) => pl.id === placeId)
    );

    const showMapHandler = () => {
        props.navigation.navigate("map", {
            readOnly: true,
            initialLocation: {
                lat: selectedPlace.lat,
                lng: selectedPlace.lng,
            },
        });
    };
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <Image source={{ uri: selectedPlace.image }} style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}> {selectedPlace.address}</Text>
                </View>
                <TouchableOpacity
                    onPress={showMapHandler}
                    style={styles.mapPreview}
                >
                    <MapPreview
                        location={{
                            lat: selectedPlace.lat,
                            lng: selectedPlace.lng,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

PlaceDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam("title"),
        //headerTitle: "details",
    };
};

const styles = StyleSheet.create({
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%",
        backgroundColor: "#ccc",
    },
    locationContainer: {
        marginVertical: 20,
        width: "90%",
        maxWidth: 350,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10,
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary,
        textAlign: "center",
    },
    mapPreview: {
        width: "100%",
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default PlaceDetailScreen;
