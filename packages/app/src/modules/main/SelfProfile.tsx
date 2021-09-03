import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useMeQuery } from "../../generated/graphql";
import { colors, layout } from "../../ui/theme";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { useApolloClient } from "@apollo/client";
import { ProfileImage } from "../../components/ProfileImage";

interface SelfProfileProps {}

export const SelfProfile: React.FC<SelfProfileProps> = ({}) => {
    const { data, loading } = useMeQuery();
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

        // upload the picture to the server
        const formData = new FormData();
        // @ts-ignore
        formData.append("image", file);
        try {
            const res = await Axios.post(
                "http://localhost:4000/upload",
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
    };

    return (
        <ScrollView>
            {loading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <View>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                borderRadius: layout.borderRadius,
                                backgroundColor: "#fff",
                                overflow: "hidden",
                            }}
                        >
                            <ProfileImage
                                imgUrl={data?.me?.imgUrl}
                                variant={"regular"}
                            />
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.name}>{data?.me?.name}</Text>
                            <Text style={styles.username}>
                                <Text style={{ fontWeight: "400" }}>@</Text>
                                {data?.me?.username}
                            </Text>
                            <Text style={styles.email}>{data?.me?.email}</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
    },

    info: {
        alignSelf: "center",
        paddingLeft: 30,
    },
    name: {
        fontSize: 25,
        fontWeight: "600",
    },
    username: {
        fontSize: 20,
        color: colors.textGray,
        fontWeight: "500",
        paddingVertical: 3,
    },
    email: {
        fontSize: 20,
        fontWeight: "500",
        color: colors.textGray,
    },
});
