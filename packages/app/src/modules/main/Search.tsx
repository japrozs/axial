import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { colors, layout } from "../../ui/theme";
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
                    color={colors.gray}
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={"Search"}
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
        backgroundColor: colors.wheat,
        paddingVertical: 14,
        paddingHorizontal: 3,
    },
    input: {
        color: "#000",
        fontSize: 17,
    },
});
