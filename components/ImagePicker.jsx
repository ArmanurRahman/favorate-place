import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import Color from "../contants/color";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState();
    const verifyPermission = async () => {
        const permited = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        );
        if (permited.status !== "granted") {
            Alert.alert(
                "Insufficant Permission",
                "You need to grant camera permission to use this app!",
                [{ text: "Ok" }]
            );
            return false;
        }
        return true;
    };

    const cameraHandler = async () => {
        const hadPermission = await verifyPermission();
        if (!hadPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setSelectedImageUrl(image.uri);
        props.onImageCapture(image.uri);
    };
    return (
        <View style={styles.ImagePicker}>
            <View style={styles.ImagePreview}>
                {!selectedImageUrl ? (
                    <Text>No image selected</Text>
                ) : (
                    <Image
                        style={styles.image}
                        source={{ uri: selectedImageUrl }}
                    />
                )}
            </View>
            <View style={styles.button}>
                <Button
                    title='Take a photo'
                    color={Color.secondary}
                    onPress={cameraHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ImagePicker: {},
    ImagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    button: { marginBottom: 10 },
});

export default ImgPicker;
