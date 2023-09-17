import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = () => {
    return (
        <View style={Style.main}>
            <ActivityIndicator size={50} />
        </View>

    )
}
export default Loader;

const Style = StyleSheet.create({
    main: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})