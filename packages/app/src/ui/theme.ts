import { Dimensions, StyleSheet } from "react-native";

const iconSize = 27;
export const postHeight = Dimensions.get("window").width + 80;
export const inputWidth = Dimensions.get("window").width - 50;

export const fonts = {
    inter_100: "Inter 100",
    inter_200: "Inter 200",
    inter_300: "Inter 300",
    inter_400: "Inter 400",
    inter_500: "Inter 500",
    inter_600: "Inter 600",
    inter_700: "Inter 700",
    inter_800: "Inter 800",
    inter_900: "Inter 900",
};

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
    postProfileImgHeight: 33,
    postProfileImgWidth: 33,
};

export const globalStyles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    button: {
        backgroundColor: "#151A21",
        paddingVertical: 11,
        borderRadius: 3,
        marginTop: "auto",
        marginBottom: 10,
        textAlign: "center",
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 19,
        color: "#fff",
        fontFamily: "Inter 600",
    },
});
