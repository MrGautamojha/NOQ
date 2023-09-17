import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { SCREEN_WIDTH, globalColor, loginToastDuration, showToast } from '../../Utils';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import en from '../../Utils/en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

function Login(props) {

    const [state, setState] = React.useState({
        userName: '',
        password: ''
    })

    const updateState = (stateName, statevalue) => {
        setState({ ...state, [stateName]: statevalue })
    }

    const onbtnPress = async () => {
        if (!state.userName && !state.password) {
            showToast(en.loginUserNameAndPasswordValidation, loginToastDuration)
        }
        else if (!state.userName) {
            showToast(en.loginUserNameValidation, loginToastDuration)
        }
        else if (!state.password) {
            showToast(en.loginPasswordValidation, loginToastDuration)
        }
        else {
            showToast("LOGGED IN", loginToastDuration)
            await AsyncStorage.setItem("USER_CRED", JSON.stringify({
                [en.userName]: state.userName, [en.password]: state.password
            }))
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'pinScreen', params: { [en.userName]: state.userName, [en.password]: state.password } }],
                }),
            );
        }
    }

    return (
        <View style={style.mainContainer}>
            <View style={style.topView} >
                <Image
                    source={require('../../Assets/appIcon.png')}
                    style={style.imgStyle}
                    resizeMode={'stretch'}
                />
                <View style={{ marginVertical: 15 }} />
                <Text style={style.topHeading}>{en.loginTopText}</Text>
            </View>
            <View style={style.bottomView} >
                <View style={[style.commonCenterUi]}>
                    <Text style={style.heading}>{en.loginUserNamePlaceholderText}</Text>
                    <CustomTextInput
                        value={state.userName}
                        onChangeText={(value) => {
                            updateState(en.userName, value)
                        }} />

                </View>
                <View style={[style.commonCenterUi, { marginVertical: 10 }]}>
                    <Text style={style.heading}>{en.loginPasswordPlaceholderText}</Text>
                    <CustomTextInput
                        value={state.password}
                        rightUiVisible={true}
                        onChangeText={(value) => {
                            updateState(en.password, value)
                        }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}>

                    </View>
                    <View style={style.forgetPassStyle}>
                        <Text style={[style.heading, style.colorChange]}>{en?.forgetPassword}</Text>
                    </View>
                </View>
                <View style={style.commonSpace} />
                <View style={style.commonCenterUi}>
                    <CustomButton
                        btnTitle={en?.logIn}
                        btnWidth={SCREEN_WIDTH * 0.62}
                        btnPress={onbtnPress}
                    />
                </View>
            </View>
        </View >
    )
};

export default Login;

const style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: globalColor },
    topView: { flex: 4, justifyContent: 'center', alignItems: 'center' },
    bottomView: { flex: 6 },
    topHeading: {
        color: '#f26dff', fontSize: 25, fontWeight: '500'
    },

    heading: {
        marginVertical: 10, color: '#fff', fontSize: 16, fontWeight: '400'
    },
    commonCenterUi: {
        justifyContent: 'center', alignItems: 'center'
    },

    commonSpace: {
        marginVertical: 10
    },
    colorChange: {
        color: '#f26dff'
    },
    imgStyle: { height: 120, width: SCREEN_WIDTH * 0.8 },
    forgetPassStyle: { flex: 0.5, justifyContent: 'flex-end', alignItems: 'center' }
})