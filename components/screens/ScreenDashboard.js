import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style'; // feel free to add styles

// screens get 'navigation' as prop from context
const ScreenDashboard = ({ navigation }) => {
  const userName = 'Test';
  return (
    <View>
      <Text variant='headlineLarge'>Hi {userName}!</Text>
      <Text variant='titleLarge'>Widgets</Text>
    </View>
  );
};

export default ScreenDashboard;
