import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, ToastAndroid } from "react-native";
import { CommonActions, useNavigation } from '@react-navigation/native';

export const globalColor = '#5f20b3';

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

export const loginToastDuration = 1000;


export const showToast = (mes, duration = 100) => {
    return ToastAndroid.show(mes, duration);
}


export const FunctioalitySettingData = [
    {
        id: 1,
        title: "Terminal Settings",
        subData: [
            { id: 1, option: "KeyPad" },
            { id: 2, option: "Menu" },
            { id: 3, option: "Tabs" },
            { id: 4, option: "Mobile" },
        ]
    },
    {
        id: 2,
        title: "Sidebar Settings",
        subData: [
            { id: 1, option: "Instance Stock Management" },
            { id: 2, option: "Cash Drawer" },
            { id: 3, option: "View Reports" },
        ]
    },
    {
        id: 3,
        title: "Payment Types Counter",
        subData: [
            { id: 1, option: "Cash" },
            { id: 2, option: "Cards" },
            { id: 3, option: "Telesales" },
            { id: 4, option: "Other" },
            { id: 5, option: "Training" },
        ]
    },
    {
        id: 4,
        title: "Payment Types Tabes",
        subData: [
            { id: 1, option: "Cash" },
            { id: 2, option: "Cards" },
            { id: 3, option: "Other" },

        ]
    },
]




