import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalColor } from '../../Utils';
const CustomHeader = (props) => {
    let { headingTitle, onPressBack } = props;
    return (
        <View style={{ height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: globalColor }}>
            <TouchableOpacity style={{ flex: 0.2, }} onPress={onPressBack}>
                <Image
                    source={require('../../Assets/arrow.png')}
                    style={{ height: 22, width: 40, marginLeft: 10 }}
                    resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff' }}>{headingTitle ? headingTitle : 'Name Of the outlet'}</Text>
            </View>

        </View>
    )
}
export default CustomHeader;

const Style = StyleSheet.create({

})