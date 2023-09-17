/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,

  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Approute from './src/Navigation/routes';




function App(): JSX.Element {




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Approute />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
