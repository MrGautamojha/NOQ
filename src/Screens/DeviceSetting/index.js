import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import en from '../../Utils/en';

function DeviceSetting(props) {
    const renderOptionList = [
        { id: 1, title: en?.printerAndCash, icon: require('../../Assets/print.png') },
        { id: 2, title: en?.cardReader, icon: require('../../Assets/cardReader.png') },
        { id: 3, title: en?.funcSetting, icon: require('../../Assets/settings.png') },
    ]

    const onPressBackBtn = () => {
        props.navigation.goBack();
    }

    const navigateToSetting = () => {
        props.navigation.navigate('functionalitySettings');
    }

    const renderList = ({ item }) => {
        return (
            <TouchableOpacity disabled={item?.id == 3 ? false : true} style={Style.renderTopView} onPress={navigateToSetting}>
                <Image
                    source={item.icon}
                    style={Style.imgStyle}
                    resizeMode={'stretch'}
                />
                <Text style={Style.optionTitle}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Style.mainContainer}>
            <CustomHeader headingTitle={en.deviceSetting} onPressBack={onPressBackBtn} />
            <View style={Style.commonSpace} />
            <FlatList
                data={renderOptionList}
                renderItem={renderList}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default DeviceSetting;

const Style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fff' },
    commonSpace: { marginVertical: 10 },
    optionTitle: { fontSize: 16, color: 'black', fontWeight: '600' },
    imgStyle: { height: 25, width: 25, marginHorizontal: 15 },
    renderTopView: { flex: 1, marginVertical: 10, flexDirection: 'row' }

})