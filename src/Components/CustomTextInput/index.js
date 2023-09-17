import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH } from '../../Utils';

function CustomTextInput(props) {

    let { value, onChangeText, rightUiVisible = false } = props

    const [visibleText, setVisibleText] = React.useState(false);
    return (
        <View style={style.mainView}>
            <View style={{ flex: rightUiVisible ? 0.8 : 1 }}>
                <TextInput
                    value={value}
                    style={style.textInnerStyle}
                    secureTextEntry={visibleText}
                    onChangeText={(val) => { onChangeText(val) }}
                />
            </View>
            {rightUiVisible ? <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                setVisibleText(!visibleText)
            }}>
                <Text style={style?.secondryTextStyle}>{visibleText ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity> : null}
        </View>
    )

}
export default CustomTextInput;


const style = StyleSheet.create(
    {
        mainView: {
            backgroundColor: 'white', height: 45, width: SCREEN_WIDTH * 0.85, borderRadius: 12, flexDirection: 'row'
        },
        textInnerStyle: {
            borderColor: 'black', height: 45, color: 'black', marginHorizontal: 10
        },
        secondryTextStyle: { color: 'black', fontSize: 12, fontWeight: '700' },

    }
)