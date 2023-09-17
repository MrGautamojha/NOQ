import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, globalColor } from "../../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const SplashScreen = (props, params = {}) => {

    const navToClearStack = (screenName) => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: screenName, params: params }],
            }),
        );
    }
    const getDataFromASync = async () => {
        let asynData = await AsyncStorage.getItem('USER_CRED')
        let parseValue = JSON.parse(asynData)
        if (parseValue) {
            navToClearStack("pinScreen", parseValue)
        }
        else {
            navToClearStack("login")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getDataFromASync();
        }, 500)

    }, [])

    return (
        <View style={Style.mainContainer}>
            <Image
                source={require('../../Assets/appIcon.png')}
                style={Style.imgStyle}
                resizeMode={'stretch'}
            />
        </View>
    )
};

export default SplashScreen;
const Style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: globalColor, justifyContent: 'center', alignItems: 'center' },
    imgStyle: { height: 120, width: SCREEN_WIDTH * 0.8 },
})