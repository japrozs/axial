import { Dimensions, StyleSheet } from "react-native";

const iconSize = 32;
export const postHeight = Dimensions.get("window").width + 80;

export const colors = {
    borderGray: "#a0a0a0",
    textGray: "#505050",
    wheat: "#E5E7EB",
    gray: "#4B5563",
    dogeBlack: "#0B0E11",
    red: "#DC2626",
    timeGray: "#787878",
    navigation: {
        active: "#000",
        lightBlack: "#1A202C",
        inActive: "#838383",
    },
};
export const layout = {
    borderRadius: 50,
    profileImgHeight: 100,
    profileImgWidth: 100,
    iconSize,
    smallProfileImgHeight: iconSize,
    smallProfileImgWidth: iconSize,
    postProfileImgHeight: 40,
    postProfileImgWidth: 40,
};

export const globalStyles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
