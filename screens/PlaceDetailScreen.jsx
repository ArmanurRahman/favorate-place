import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const PlaceDetailScreen = (props) => {
    return (
        <View>
            <Text> Place Details Screen</Text>
        </View>
    );
};

PlaceDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam("title"),
        //headerTitle: "details",
    };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
