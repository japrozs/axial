import React from "react";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    colors,
    fonts,
    globalStyles,
    inputWidth,
    layout,
} from "../../ui/theme";
import { Entypo } from "@expo/vector-icons";
import { useLoginMutation, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { errorToMap } from "../../utils/errorToMap";
import { AuthStackNav } from "./AuthNav";

interface LoginProps {}

interface ErrorProps {
    usernameOrEmail?: string;
    password?: string;
}

export const Login: React.FC<AuthStackNav<"Login">> = ({ navigation }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [loginMut] = useLoginMutation();
    const client = useApolloClient();

    const login = async () => {
        const res = await loginMut({
            variables: {
                usernameOrEmail,
                password,
            },
        });
        if (res.data?.login.errors) {
            return setErrors(errorToMap(res.data?.login.errors));
        }
        await client.resetStore();
    };

    return (
        <View style={styles.view}>
            <Text style={styles.label}>Username or email</Text>
            <TextInput
                value={usernameOrEmail}
                autoCapitalize={"none"}
                onChangeText={(t) => setUsernameOrEmail(t)}
                placeholderTextColor={colors.gray}
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("usernameOrEmail")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Username or email"
            />
            {errors.hasOwnProperty("usernameOrEmail") ? (
                <Text style={styles.error}>{errors.usernameOrEmail}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                placeholderTextColor={colors.gray}
                autoCapitalize={"none"}
                secureTextEntry={true}
                onChangeText={(t) => setPassword(t)}
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("password")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Username or email"
            />
            {errors.hasOwnProperty("password") ? (
                <Text style={styles.error}>{errors.password}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                style={[globalStyles.button, styles.button]}
                onPress={login}
            >
                <View style={[globalStyles.flex, styles.loginButton]}>
                    <Text style={globalStyles.buttonText}>Login</Text>
                    <Entypo
                        style={{ marginLeft: 10 }}
                        name="login"
                        size={24}
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.create}>
                Don't have an account?{" "}
                <Text
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    style={{ color: colors.white, fontWeight: "500" }}
                >
                    Create one
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingTop: 80,
        padding: 20,
        alignSelf: "center",
    },
    input: {
        borderWidth: 1,
        padding: 11,
        fontSize: 18,
        borderRadius: 5,
        width: inputWidth,
        marginVertical: 7,
        fontFamily: fonts.inter_500,
        color: colors.white,
        fontWeight: "500",
    },
    label: {
        color: colors.white,
        fontFamily: fonts.inter_600,
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20,
    },
    button: {
        marginTop: 20,
    },
    loginButton: {
        alignSelf: "center",
    },
    error: {
        color: colors.errorRed,
        fontSize: 16.5,
        fontFamily: fonts.inter_500,
    },
    create: {
        color: colors.grayLight,
        marginTop: 20,
        fontFamily: fonts.inter_500,
        fontSize: 17,
        alignSelf: "center",
    },
});
