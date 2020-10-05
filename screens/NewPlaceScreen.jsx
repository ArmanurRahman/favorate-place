import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
} from "react-native";
import Color from "../contants/color";
import { useDispatch } from "react-redux";
import * as placeActions from "../store/place-action";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/locationPicker";

const NewPlaceScreen = (props) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState();

    const dispatch = useDispatch();
    const inputHandler = (text) => {
        setTitle(text);
    };
    const captureImageHandler = (imageUri) => {
        setImage(imageUri);
    };
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={(text) => inputHandler(text)}
                ></TextInput>
                <ImagePicker onImageCapture={captureImageHandler} />
                <LocationPicker navigation={props.navigation} />
                <Button
                    title='Save'
                    color={Color.primary}
                    onPress={() => {
                        dispatch(placeActions.addPlace(title, image));
                        props.navigation.navigate("placeList");
                    }}
                />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "New Place",
    };
};
const styles = StyleSheet.create({
    screen: {
        padding: 10,
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 5,
        marginHorizontal: 2,
    },
    title: { fontSize: 18 },
});

export default NewPlaceScreen;
