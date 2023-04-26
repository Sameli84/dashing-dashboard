import { React, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { constants } from '../../../styles/style';

const ScreenMoodHistory = ({ navigation, route }) => {
  const [period, setPeriod] = useState('Today');

  const [happyPercentage, setHappyPercentage] = useState('Loading...');
  const [blankPercentage, setBlankPercentage] = useState('Loading...');
  const [sadPercentage, setSadPercentage] = useState('Loading...');
  const [lovePercentage, setLovePercentage] = useState('Loading...');
  const [partyPercentage, setPartyPercentage] = useState('Loading...');
  const [angryPercentage, setAngryPercentage] = useState('Loading...');

  useEffect(() => {
    console.log(route.params.moodHistoryRange);
    if (route.params) {
      setPeriod(route.params.moodHistoryParam);
      let feels = route.params.moodHistoryRange;
      let total = 0;
      for (let [key, value] of Object.entries(feels)) {
        total += value;
      }
      console.log(total);
      console.log(route.params.moodHistoryRange);
      setHappyPercentage(((feels['0x1F600'] / total) * 100).toFixed(0).toString() + ' %');
      setBlankPercentage(((feels['0x1F610'] / total) * 100).toFixed(0).toString() + ' %');
      setSadPercentage(((feels['0x1F622'] / total) * 100).toFixed(0).toString() + ' %');
      setLovePercentage(((feels['0x1F60D'] / total) * 100).toFixed(0).toString() + ' %');
      setPartyPercentage(((feels['0x1F973'] / total) * 100).toFixed(0).toString() + ' %');
      setAngryPercentage(((feels['0x1F621'] / total) * 100).toFixed(0).toString() + ' %');
    }
  });

  return (
    <View style={{ flex: 14, backgroundColor: constants.COLOR_WHITE }}>
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
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F600;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {happyPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F610;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {blankPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F622;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {sadPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F60D;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {lovePercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text style={styles.smiley}>&#x1F973;</Text>
        </View>
        <Text style={{ flex: 5, padding: 5, textAlignVertical: 'center', textAlign: 'right' }} variant='headlineMedium'>
          {partyPercentage}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: constants.INPUT_BORDER_RADIUS }}>
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
    borderRadius: constants.INPUT_BORDER_RADIUS,
    backgroundColor: '#333333',
    fontSize: 36,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ScreenMoodHistory;
