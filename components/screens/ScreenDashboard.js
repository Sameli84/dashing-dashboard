import { React, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style'; // feel free to add styles
import MoodWidgetPart from '../MoodLogger/MoodWidgetPart';
import * as backend from '../backend/backend';
import { useEffect } from 'react';

// screens get 'navigation' as prop from context
const ScreenDashboard = ({ navigation, route }) => {
  const userName = 'Test';
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#def9f4' }}>
      <Text style={{ flex: 1, textAlignVertical: 'center', paddingLeft: 7 }} variant='headlineLarge'>
        Hi {userName}!
      </Text>
      <Text style={{ flex: 1, textAlignVertical: 'center', paddingLeft: 7 }} variant='titleLarge'>
        Widgets
      </Text>
      <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
      <View style={{ flex: 3 }}></View>
      <View style={{ flex: 3 }}></View>
    </View>
  );
};

export default ScreenDashboard;
