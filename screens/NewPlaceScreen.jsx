import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

const NewPlaceScreen = (props) => {
    const [title, setTitle] = useState("");

    const inputHandler = (text) => {
        setTitle(text);
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
