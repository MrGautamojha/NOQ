import React, { useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalColor, showToast } from '../../Utils';
import CustomHeader from '../../Components/CustomHeader';


function PinScreen(props) {
    const [optData, setOptData] = React.useState({
        1: { idx: 1, val: '' }, 2: { idx: 2, val: '' },
        3: { idx: 3, val: '' }, 4: { idx: 4, val: '' }
    })
    const onPressBackBtn = () => {
        // props.navigation.goBack();
    }
    useEffect(() => {
        StatusBar.setBackgroundColor(globalColor)
    }, [])


    const renderPinInput = ({ item }) => {
        return (
            <View style={{ marginVertical: 10 }}>
                <TextInput style={Style.textStyle}
                    keyboardType={'number-pad'}
                    value={item?.val}
                    maxLength={1}
                    onChangeText={(e) => {
                        let dummyVal = { idx: item?.idx, val: e }
                        setOptData({ ...optData, [item?.idx]: dummyVal })
                        if (item?.idx == 4 && e) {
                            addValue(null)
                        }
                    }}
                />
            </View>
        )
    }

    const addValue = (id) => {
        let isAllTextFilled = false;
        if (id) {
            for (let i = 0; i < [...Object.values(optData)].length; i++) {
                let valAtIdx = optData[i + 1];
                if (valAtIdx?.val == "") {
                    setOptData({ ...optData, [i + 1]: { idx: valAtIdx?.idx, val: "" + id } })
                    if (i == 3) { isAllTextFilled = true; }
                    break;
                }
            }
        } else {
            isAllTextFilled = true;
        }
        if (isAllTextFilled) {
            showToast("OTP added Successfully", 500)
            props?.navigation?.navigate('deviceScreen')
        }
    }

    const renderBtn = (idx) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                <TouchableOpacity onPress={() => { addValue(idx === 0 ? null : idx) }} disabled={idx === 0 ? true : false} style={[Style.boxMainStyle, { backgroundColor: idx === 0 ? globalColor : 'white', }]}>
                    <Text style={Style.boxTextStyle}>{idx === 0 ? '' : idx}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { addValue(idx === 0 ? idx : idx + 1) }} style={Style.boxMainStyle}>
                    <Text style={Style.boxTextStyle}>{idx === 0 ? idx : idx + 1}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { addValue(idx === 0 ? null : idx + 2) }} disabled={idx === 0 ? true : false} style={[Style.boxMainStyle, { backgroundColor: idx === 0 ? globalColor : 'white', }]}>
                    <Text style={Style.boxTextStyle}>{idx === 0 ? '' : idx + 2}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const renderChip = (value, backColor = '#fff', textcustomStyle = 'black') => {
        return (
            <View style={[Style.renderBox, { backgroundColor: backColor }]}>
                <Text style={[Style.valueStyle, { color: textcustomStyle, }]}>{value}</Text>
            </View>
        )
    }

    return (
        <View style={Style.mainContainer}>
            <CustomHeader headingTitle={"Name of the Outlet"} onPressBack={onPressBackBtn} />
            <View style={Style.commonVerticleSpace} />
            <View style={Style.renderOtp}>
                <FlatList
                    data={Object.values(optData)}
                    renderItem={renderPinInput}
                    horizontal
                    keyExtractor={(item) => item.idx}
                    extraData={optData}
                />
            </View>
            {renderBtn(1)}
            {renderBtn(4)}
            {renderBtn(7)}
            {renderBtn(0)}
            <View style={Style.actionView}>
                <Text style={Style.actionTextStyle}>{"Actions"}</Text>
                <View style={Style.commonVerticleSpace} />
                <View style={Style.chipStyle}>
                    {renderChip("Clock In/0ut", "#fff", globalColor)}
                    {renderChip("Device Settings", "#fff", globalColor)}
                </View>
                <View style={Style.secondChipStyle}>
                    {renderChip("Open Register", '#809861', '#fff')}
                </View>
            </View>
            <View style={Style.nofityView}>
                <Text style={Style.headingBottom}>{"Notifications"}</Text>
                <View style={{ marginVertical: 10 }} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    {renderChip("3 New Pre-Orders", '#f26dff', '#fff')}
                    {renderChip("2 Open Tabs", '#f26dff', '#fff')}
                </View>
            </View>
        </View>
    )
}

export default PinScreen;


const Style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: globalColor },
    renderOtp: { justifyContent: 'center', alignItems: 'center' },
    commonVerticleSpace: { marginVertical: 10 },
    actionView: { marginHorizontal: 20, marginTop: 15 },
    actionTextStyle: { color: '#fff', fontSize: 16 },
    chipStyle: { justifyContent: 'space-between', flexDirection: 'row' },
    secondChipStyle: { justifyContent: 'center', flexDirection: 'row', marginTop: 20 },
    nofityView: { marginHorizontal: 20, marginTop: 15 },
    headingBottom: { color: '#fff', fontSize: 16 },
    textStyle: {
        width: 50, borderRadius: 1,
        borderWidth: 2, borderLeftColor: globalColor,
        borderBottomColor: '#fff', borderRightColor: globalColor,
        borderTopColor: globalColor, marginLeft: 10,
        paddingLeft: 20, fontSize: 20, color: '#fff'
    },
    valueStyle: { textAlign: 'center', fontWeight: '700', fontSize: 12, },
    renderBox: { height: 35, width: 150, borderRadius: 50 / 2, justifyContent: 'center' },
    boxTextStyle: { color: 'black', textAlign: 'center', fontSize: 20, fontWeight: '600' },
    boxMainStyle: { height: 60, width: 90, justifyContent: 'center', backgroundColor: '#fff' }
})