import React, { useEffect } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonItem from "../components/headerButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItems from "../components/PlaceItem";
import * as placeActions from "../store/place-action";

const PlaceListScreen = (props) => {
    const dispatch = useDispatch();
    const places = useSelector((state) => state.place.places);

    useEffect(() => {
        dispatch(placeActions.loadPlaces());
    }, [dispatch]);
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
