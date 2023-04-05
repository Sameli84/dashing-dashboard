import React, { useEffect, useState } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import MoodWidgetPart from '../../MoodLogger/MoodWidgetPart';
import * as backend from '../../backend/backend.js';

// screens get 'navigation' as prop from context
const ScreenMoodLogger = ({ navigation, route }) => {
  const [moodToday, setMoodToday] = useState('0x1F600');
  const [moodYesterday, setMoodYesterday] = useState('0x1F600');
  let percentageToday = '100 %';

  useEffect(() => {
    const asyncToday = async () => {
      const today = await backend.getFeelingsByDate(Date.now());
      today.sort((a, b) => parseInt(a.timeStamp) - parseInt(b.timeStamp));
      let total = 0;

      let feels = {
        '0x1F600': 0,
        '0x1F610': 0,
        '0x1F622': 0,
        '0x1F60D': 0,
        '0x1F973': 0,
        '0x1F621': 0,
      };

      for (let index = 0; index < today.length; index++) {
        if (index < today.length - 1) {
          feels[today[index].mood] += today[index + 1].timeStamp - today[index].timeStamp;
        } else {
          feels[today[index].mood] += Date.now() - today[index].timeStamp;
        }
      }

      for (let [key, value] of Object.entries(feels)) {
        total += value;
      }

      const moodStore = Object.keys(feels).reduce((a, b) => (feels[a] > feels[b] ? a : b));
      setMoodToday(moodStore);
      console.log((feels[moodStore] / total * 100).toFixed(0).toString() + " %");
    };
    asyncToday();
  });

  const asyncYesterday = async (start, end, setMood) => {
    const data = await backend.getFeelingsByDateRange(start, end);    
    console.log(data);
    const entries = data[0].Feels;
    entries.sort((a, b) => parseInt(a.timeStamp) - parseInt(b.timeStamp));
    let total = 0;

    let feels = {
      '0x1F600': 0,
      '0x1F610': 0,
      '0x1F622': 0,
      '0x1F60D': 0,
      '0x1F973': 0,
      '0x1F621': 0,
    };

    for (let index = 0; index < entries.length; index++) {
      if (index < entries.length - 1) {
        feels[entries[index].mood] += (entries[index + 1].timeStamp - entries[index].timeStamp);
      } else {
        feels[entries[index].mood] += (end - entries[index].timeStamp);
      }
    }

    for (let [key, value] of Object.entries(feels)) {
      total += value;
    }

    const moodStore = Object.keys(feels).reduce((a, b) => (feels[a] > feels[b] ? a : b));

    setMood(moodStore);
    console.log(((feels[moodStore] / total) * 100).toFixed(0).toString() + ' %');
  };

  const yesterdayStart = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);
  const yesterdayEnd = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999);

  useEffect(() => {
    asyncYesterday(yesterdayStart, yesterdayEnd, setMoodYesterday);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#def9f4' }}>
      <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Today',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Today
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {percentageToday}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodToday)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Yesterday',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Yesterday
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          85 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodYesterday)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This week',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          60 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Last week',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Last week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          65 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This month',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This month
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          48 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This year',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          38 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Last year',
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Last year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          42 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
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

export default ScreenMoodLogger;
