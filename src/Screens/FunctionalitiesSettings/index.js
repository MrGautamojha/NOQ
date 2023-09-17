import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import { FunctioalitySettingData, setDataInAsync } from '../../Utils';
import en from '../../Utils/en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';

function FunctionalitySettings(props) {

    const [loading, setLoading] = React.useState(true)
    const onPressBackBtn = () => {
        props.navigation.goBack();
    }

    const [renderList, setRenderList] = React.useState({});

    const setValueInAsyncStorage = async () => {
        await AsyncStorage.setItem('listData', JSON.stringify(renderList))
    }

    useEffect(() => {
        if (Object.keys(renderList).length) {
            setValueInAsyncStorage()
        }
    }, [renderList])


    const setDataFun = async () => {
        const asynData = await AsyncStorage.getItem("listData");
        let asynParseVal = JSON.parse(asynData);
        if (asynParseVal && Object.keys(asynParseVal).length) {
            setRenderList(asynParseVal)
            setLoading(false);
        }
        else {
            let tempData = {}
            let initalKey = 100
            FunctioalitySettingData.map((data) => {
                const keyPass = initalKey;
                let dummData = {
                    id: initalKey,
                    key: initalKey,
                    heading: data?.title,
                    subData: {}
                };
                if (data?.subData && Object.values(data.subData).length) {
                    for (let i = 0; i < Object.values(data.subData).length; i++) {
                        let innerSubData = { ...data?.subData[i] }
                        let shortData = {
                            idx: innerSubData?.id,
                            title: innerSubData?.option,
                            selected: false,
                            showUpIcon: innerSubData?.id == 1 ? false : true,
                            showDownIcon: innerSubData?.id == Object.values(data.subData).length ? false : true,
                        }
                        dummData = { ...dummData, "subData": { ...dummData?.subData, [innerSubData?.id]: shortData } }
                    }
                }
                tempData = { ...tempData, [keyPass]: dummData }
                initalKey = initalKey + 1;
            })
            setRenderList(tempData)
            setLoading(false)
        }

    }

    useEffect(() => {
        setDataFun()
    }, [])

    const onPressSelect = (subItem, item) => {
        let tempData = {
            ...item,
            "subData": { ...item.subData },
        }
        if (tempData?.subData && Object.keys(tempData?.subData).length) {
            tempData.subData = { ...tempData.subData, [subItem?.idx]: { ...subItem, ['selected']: !subItem?.selected } }
        }
        setRenderList({ ...renderList, [item.key]: tempData })
    }


    const onPressDownKey = (subItem, item, length) => {
        let tempData = { ...item, "subData": { ...item.subData } }
        let currentIdx = subItem?.idx;
        let nextIdx = subItem?.idx + 1;
        let copyValue = { ...item?.subData?.[currentIdx + 1] }
        if (copyValue?.idx) {
            copyValue.idx = currentIdx;
            copyValue.showDownIcon = true;
            copyValue.showUpIcon = currentIdx !== 1 ? true : false;
        }
        if (tempData?.subData && Object.keys(tempData?.subData).length) {
            tempData.subData = {
                ...tempData.subData,
                [currentIdx]: copyValue,
                [nextIdx]: { ...subItem, ['idx']: nextIdx, ["showDownIcon"]: nextIdx == length ? false : true, ["showUpIcon"]: nextIdx !== 1 ? true : false }
            }
        }
        setRenderList({ ...renderList, [item.key]: tempData })
    }


    const onPressUpKey = (subItem, item, length) => {
        let tempData = {
            ...item, "subData": { ...item.subData }
        }
        let currentIdx = subItem?.idx;
        let nextIdx = subItem?.idx - 1;
        let copyValue = { ...subItem }
        if (copyValue?.idx) {
            copyValue.idx = nextIdx;
            copyValue.showUpIcon = nextIdx == 1 ? false : true;
            copyValue.showDownIcon = nextIdx != length ? true : false;
        }
        if (tempData?.subData && Object.keys(tempData?.subData).length) {
            tempData.subData = { ...tempData.subData, [nextIdx]: copyValue, [currentIdx]: { ...item?.subData?.[nextIdx], ['idx']: currentIdx, ["showUpIcon"]: true, ["showDownIcon"]: currentIdx == length ? false : true } }
        }
        setRenderList({ ...renderList, [item.key]: tempData })
    }


    const renderAllItem = (data, mainItem, length) => {
        return (
            <View>
                <View style={Style.renderSubItemContainer}>
                    <View style={{ flex: 0.2 }}>
                        <TouchableOpacity style={Style.renderTopBox} onPress={() => { onPressSelect(data, mainItem, length) }}>
                            {data?.selected ? <View style={Style.renderInnerBox} /> : null}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={Style.renderTitle}>{data?.title}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => { onPressUpKey(data, mainItem, length) }}>
                        {data?.showUpIcon && <Text style={Style.renderUpStyle}>{en.up}</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => { onPressDownKey(data, mainItem, length) }}>
                        {data?.showDownIcon && <Text style={Style?.renderBottomStyle}>{en.down}</Text>}
                    </TouchableOpacity>
                </View>
                <View style={Style.divider} />
            </View>
        )
    }

    const renderListUi = ({ item }) => {
        const subObjLength = Object.keys(item?.subData).length;
        return (<View style={Style.topView}>
            <Text style={Style.functionHeading}>{item?.heading}</Text>
            <View style={Style.commonSpace} />
            {item?.subData && Object.keys(item?.subData).length && Object.values(item?.subData).map((dx) => {
                return renderAllItem(dx, item, subObjLength)
            })}
        </View>)
    }

    return (
        <View style={Style.mainContainer} >

            <CustomHeader headingTitle={en.functionScreenHeading} onPressBack={onPressBackBtn} />
            {loading ? <Loader /> : <>
                <View style={Style.commonSpace} />
                <FlatList
                    data={Object.values(renderList)}
                    renderItem={renderListUi}
                    keyExtractor={(item) => {
                        return item.key
                    }}
                />
            </>}
        </View>
    )
};

export default FunctionalitySettings;
const Style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fff' },
    renderSubItemContainer: { flexDirection: 'row', marginTop: 10 },
    renderTopBox: { backgroundColor: "#fff", height: 20, width: 20, borderColor: '#f26dff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    renderInnerBox: { padding: 0, backgroundColor: '#f26dff', height: 12, width: 12 },
    renderTitle: { color: 'black' },
    renderUpStyle: { color: '#809861' },
    renderBottomStyle: { color: '#f26dff' },
    commonSpace: { marginVertical: 10 },
    functionHeading: { color: 'black', fontWeight: '600', fontSize: 16, marginBottom: 5 },
    topView: { flex: 1, marginVertical: 10, marginHorizontal: 15 },
    divider: { height: 1, backgroundColor: '#868686', flex: 1, marginVertical: 10 },



})