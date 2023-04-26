import { React, useState, useEffect, useRef } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const ScreenMoodHistory = ({ navigation, route }) => {
  const [period, setPeriod] = useState('Today');
  const [feels, setFeels] = useState({
    '0x1F600': 0,
    '0x1F610': 0,
    '0x1F622': 0,
    '0x1F60D': 0,
    '0x1F973': 0,
    '0x1F621': 0,
  });
  const [happyPercentage, setHappyPercentage] = useState('Loading...');
  const [blankPercentage, setBlankPercentage] = useState('Loading...');
  const [sadPercentage, setSadPercentage] = useState('60%');
  const [lovePercentage, setLovePercentage] = useState('60%');
  const [partyPercentage, setPartyPercentage] = useState('60%');
  const [angryPercentage, setAngryPercentage] = useState('60%');
  let total = 0;
  useEffect(() => {
    const getPeriod = navigation.addListener('focus', () => {
      const fetchData = async () => {
        if (route.params) {
          setPeriod(route.params.moodHistoryParam);
          setFeels(route.params.moodHistoryRange);
        }
        console.log(feels);
        for (let [key, value] of Object.entries(feels)) {
          total += value;
        }        
      };

      const exampleSecond = async () => {
        await fetchData();
        setHappyPercentage(((feels['0x1F600'] / total) * 100).toFixed(0).toString() + ' %');
        setBlankPercentage(((feels['0x1F610'] / total) * 100).toFixed(0).toString() + ' %');
        setSadPercentage(((feels['0x1F622'] / total) * 100).toFixed(0).toString() + ' %');
        setLovePercentage(((feels['0x1F60D'] / total) * 100).toFixed(0).toString() + ' %');
        setPartyPercentage(((feels['0x1F973'] / total) * 100).toFixed(0).toString() + ' %');
        setAngryPercentage(((feels['0x1F621'] / total) * 100).toFixed(0).toString() + ' %');
      };
      exampleSecond();
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
          {happyPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F610;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {blankPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F622;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {sadPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F60D;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {lovePercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F973;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {partyPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F621;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {angryPercentage}
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
