import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { colors, fonts, layout } from "../../ui/theme";
import { AntDesign } from "@expo/vector-icons";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <AntDesign
                    name="search1"
                    style={{ paddingHorizontal: 10 }}
                    size={layout.iconSize - 5}
                    color={colors.grayLight}
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={"Search"}
                    placeholderTextColor={colors.gray}
                />
            </View>
            <Text>search page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 3,
    },
    input: {
        backgroundColor: colors.dogeGray,
        width: "86%",
        borderRadius: 3,
        paddingVertical: 8,
        marginLeft: 3,
        paddingLeft: 10,
        fontFamily: fonts.inter_500,
        color: colors.white,
        fontSize: 17,
    },
});
