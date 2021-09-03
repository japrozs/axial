import { Dimensions, StyleSheet } from "react-native";

const iconSize = 32;
export const postHeight = Dimensions.get("window").width + 80;

export const colors = {
    borderGray: "#a0a0a0",
    textGray: "#909090",
    wheat: "#E5E7EB",
    white: "#fff",
    gray: "#4B5563",
    dogeBlack: "#0B0E11",
    dogeGray: "#151A21",
    dogeTextGray: "#B4B9C0",
    red: "#DC2626",
    errorRed: "#F56565",
    grayLight: "#5D7290",
    timeGray: "#787878",
    iphoneBlue: "#007AFF",
    navigation: {
        active: "#fff",
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

    button: {
        backgroundColor: "#151A21",
        paddingVertical: 15,
        borderRadius: 3,
        marginTop: "auto",
        marginBottom: 10,
        textAlign: "center",
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 20,
        color: "#fff",
        fontWeight: "600",
    },
});
