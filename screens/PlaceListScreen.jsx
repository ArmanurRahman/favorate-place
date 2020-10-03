import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonItem from "../components/headerButton";

const PlaceListScreen = (props) => {
    return (
        <View>
            <Text>Place List Screen</Text>
        </View>
    );
};

PlaceListScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "All Places",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtonItem}>
                <Item
                    title='add'
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => {
                        navData.navigation.navigate("newPlace");
                    }}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({});

export default PlaceListScreen;
