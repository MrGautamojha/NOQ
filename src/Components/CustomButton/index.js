import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SCREEN_WIDTH } from '../../Utils';

function CustomButton(props) {

    let { btnTitle, btnWidth, btnPress } = props;
    return (
        <TouchableOpacity style={[Style.mainView, { width: btnWidth ? btnWidth : SCREEN_WIDTH * 0.9, }]} onPress={btnPress}>
            <Text style={Style.title}>{btnTitle}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const Style = StyleSheet.create({
    title: { color: '#fff', fontSize: 14, textAlign: 'center' },
    mainView: { backgroundColor: '#f26dff', height: 45, justifyContent: 'center', borderRadius: 10, borderColor: 'white', borderWidth: 2 }



})