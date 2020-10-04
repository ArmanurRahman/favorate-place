import React from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonItem from "../components/headerButton";
import { useSelector } from "react-redux";
import PlaceItems from "../components/PlaceItem";

const PlaceListScreen = (props) => {
    const places = useSelector((state) => state.place.places);
    return (
        <View>
            <FlatList
                data={places}
                keyExtractor={(Item) => Item.id}
                renderItem={(itemData) => (
                    <PlaceItems
                        image={itemData.item.image}
                        title={itemData.item.title}
                        address={null}
                        onSelect={() => {
                            props.navigation.navigate("placeDetails", {
                                title: itemData.item.title,
                                id: itemData.item.id,
                            });
                        }}
                    />
                )}
            />
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
