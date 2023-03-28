import { React, useState, useEffect, useRef } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const ScreenMoodHistory = ({ navigation, route }) => {
  const [period, setPeriod] = useState('Today');

  useEffect(() => {
    const getPeriod = navigation.addListener('focus', () => {
      // Screen was focused
      if (route.params) {
        setPeriod(route.params.moodHistoryParam);
      }
    });
    return getPeriod;
  });

  return <Text>{period}</Text>;
};

export default ScreenMoodHistory;
