import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// screens get 'navigation' as prop from context
const ScreenSettings = ({ navigation }) => {
  return (
    <View>
      <Text variant='headlineLarge'>Settings</Text>
      <Text>Debug / settings site for any functions or actions until we define what to do with this Screen</Text>
    </View>
  );
};

export default ScreenSettings;
