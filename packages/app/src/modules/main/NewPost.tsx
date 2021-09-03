import { Camera } from "expo-camera";
import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../ui/theme";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MainStackNav } from "./MainNav";
import { useApolloClient } from "@apollo/client";
import { Button } from "react-native";

interface NewPostProps {}

export const NewPost: React.FC<MainStackNav<"NewPost">> = ({ navigation }) => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState({});
    const client = useApolloClient();

    const pickImage = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status != "granted") {
            await Camera.getCameraPermissionsAsync();
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (imageResult.cancelled) {
            alert("Image upload was interrupted in between");
            return;
        }

        const { uri, type } = imageResult;
        const file = {
            uri,
            type: "image/png",
            name: "test-image",
        };
        setFile(file);
    };

    const upload = async () => {
        // upload the picture to the server
        if (file == {}) {
            alert("empty object. returning...");
            return;
        }
        const formData = new FormData();
        console.log(file);
        // @ts-ignore
        formData.append("image", file);
        formData.append("description", description);
        try {
            const res = await axios.post(
                "http://localhost:4000/upload-img",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }

        await client.resetStore();
        navigation.navigate("Home");
    };
    return (
        <View>
            <Text onPress={pickImage} style={styles.chooseText}>
                Choose Image
            </Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={(t) => setDescription(t)}
            />
            <Button onPress={upload} title="Upload" />
        </View>
    );
};

const styles = StyleSheet.create({
    chooseText: {
        color: "#007AFF",
        fontSize: 19,
        fontWeight: "600",
        justifyContent: "center",
    },
    input: {
        padding: 10,
        borderColor: "#000",
        borderWidth: 1,
    },
});
