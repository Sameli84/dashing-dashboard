import { React, useState, useEffect, useRef } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

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

  return (
    <View style={{ flex: 14, backgroundColor: '#def9f4' }}>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', paddingLeft: 7 }} variant='headlineLarge'>
          My Mood {period}
        </Text>
        <Ionicons
          size={58}
          name='arrow-back-circle-outline'
          style={{ flex: 1, textAlignVertical: 'center' }}
          title='Back'
          onPress={() => {
            navigation.navigate('Mood');
          }}
        ></Ionicons>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F600;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F610;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F622;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F60D;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F973;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F621;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          52%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smiley: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#333333',
    fontSize: 36,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ScreenMoodHistory;
