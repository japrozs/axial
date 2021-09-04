import { Camera } from "expo-camera";
import React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, fonts, globalStyles, layout } from "../../ui/theme";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MainStackNav } from "./MainNav";
import { useApolloClient } from "@apollo/client";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useCreatePostMutation } from "../../generated/graphql";

interface NewPostProps {}

export const NewPost: React.FC<MainStackNav<"NewPost">> = ({ navigation }) => {
    const [description, setDescription] = useState("");
    const [pictureUri, setPictureUri] = useState("");
    const [file, setFile] = useState({});
    const client = useApolloClient();
    const [focus, setFocus] = useState(false);
    const [createPost] = useCreatePostMutation();

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
        setPictureUri(uri);
    };

    const ImagePostUpload = async () => {
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
        setPictureUri("");
        setDescription("");
        navigation.navigate("Home");
    };

    const upload = async () => {
        if (description.trim().length == 0) {
            alert("Description cannot be empty!");
        }
        if (pictureUri.trim().length == 0) {
            const res = await createPost({
                variables: {
                    desc: description,
                },
            });
            console.log(res);
            await client.resetStore();
            setPictureUri("");
            setDescription("");
            navigation.navigate("Home");
        } else {
            ImagePostUpload();
        }
    };
    return (
        <View style={styles.container}>
            {pictureUri.trim().length == 0 ? (
                <></>
            ) : (
                <>
                    <Image style={styles.img} source={{ uri: pictureUri }} />
                    <Button
                        onPress={() => setPictureUri("")}
                        title={"Remove image"}
                    />
                </>
            )}
            <View style={[globalStyles.flex, styles.titleContainer]}>
                <Text style={styles.label}>Post body</Text>
                <Ionicons
                    onPress={pickImage}
                    style={styles.chooseText}
                    name="md-image-outline"
                    size={24}
                    color="black"
                />
            </View>

            <TextInput
                style={[
                    styles.input,
                    focus
                        ? {
                              borderColor: "#fff",
                          }
                        : {
                              borderColor: colors.borderGray,
                          },
                ]}
                value={description}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                multiline={true}
                onChangeText={(t) => setDescription(t)}
            />
            <TouchableOpacity onPress={upload} style={globalStyles.button}>
                <View style={[globalStyles.flex, { justifyContent: "center" }]}>
                    <Text style={globalStyles.buttonText}>Create post</Text>
                    <AntDesign
                        style={styles.icon}
                        name="arrowright"
                        size={24}
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        height: "100%",
    },
    chooseText: {
        color: "#fff",
        fontSize: 25,
        marginLeft: "auto",
        marginRight: 2,
    },
    input: {
        padding: 10,
        borderRadius: 4,
        height: 60,
        fontFamily: fonts.inter_500,
        color: "#fff",
        borderWidth: 1,
    },
    heading: {
        fontSize: 25,
        fontFamily: fonts.inter_600,
    },
    label: {
        color: colors.textGray,
        fontSize: 20,
        fontFamily: fonts.inter_600,
    },
    titleContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    img: {
        height: Dimensions.get("window").width - 26,
        width: Dimensions.get("window").width - 26,
        borderRadius: 3,
        marginVertical: 10,
        marginBottom: 20,
    },
    icon: {
        marginLeft: 10,
    },
});
