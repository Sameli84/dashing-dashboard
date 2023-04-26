import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MoodWidgetPart from '../../MoodLogger/MoodWidgetPart';
import * as backend from '../../backend/backend.js';

// screens get 'navigation' as prop from context
let feels = { today: {}, yesterday: {}, thisWeek: {}, lastWeek: {}, thisMonth: {}, thisYear: {}, lastYear: {} };

for (let key in feels) {
  feels[key] = {
    '0x1F600': 0,
    '0x1F610': 0,
    '0x1F622': 0,
    '0x1F60D': 0,
    '0x1F973': 0,
    '0x1F621': 0,
  };
}

const ScreenMoodLogger = ({ navigation, route }) => {
  const [moodToday, setMoodToday] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodYesterday, setMoodYesterday] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodThisWeek, setMoodThisWeek] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodLastWeek, setMoodLastWeek] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodThisMonth, setMoodThisMonth] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodThisYear, setMoodThisYear] = useState({ mood: '0x1F600', percentage: '100 %' });
  const [moodLastYear, setMoodLastYear] = useState({ mood: '0x1F600', percentage: '100 %' });

  // Get mood entries from backend within time range and set visible moods with useState hook
  const getMoodHistory = async (start, end, setMood, feels) => {
    const data = await backend.getFeelingsByDateRange(start, end);
    if (data.length == 0) {
      return;
    }
    let total = 0;

    // Go through entries received from backend
    data.forEach((element) => {
      for (let index = 0; index < element.Feels.length; index++) {
        if (index < element.Feels.length - 1) {
          feels[element.Feels[index].mood] += element.Feels[index + 1].timeStamp - element.Feels[index].timeStamp;
        } else {
          if (setMood != setMoodToday) {
            feels[element.Feels[index].mood] += 900000;
          }
        }
      }
    });

    for (let [key, value] of Object.entries(feels)) {
      total += value;
    }

    // Get most prominent mood for time range and set it with hook
    const moodStore = Object.keys(feels).reduce((a, b) => (feels[a] > feels[b] ? a : b));
    setMood({ mood: moodStore, percentage: ((feels[moodStore] / total) * 100).toFixed(0).toString() + ' %' });
  };

  // Starting and ending timestamps for different time ranges
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const yesterdayStart = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);
  const yesterdayEnd = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999);

  const weekInMilliSeconds = 604800000;

  const firstDayOfMonth = new Date(new Date().setDate(1)).setHours(0, 0, 0, 0);

  const firstDayOfYear = new Date().setFullYear(new Date().getFullYear(), 0, 1);
  const firstDayOfYearInMillis = new Date(firstDayOfYear).setHours(0, 0, 0, 0);

  const firstDayOfLastYear = new Date().setFullYear(new Date().getFullYear() - 1, 0, 1);
  const firstDayOfLastYearInMillis = new Date(firstDayOfLastYear).setHours(0, 0, 0, 0);

  // Set historical moods, only needs to be done once
  useEffect(() => {
    getMoodHistory(yesterdayStart, yesterdayEnd, setMoodYesterday, feels.yesterday);
    getMoodHistory(
      getMonday(new Date() - weekInMilliSeconds).setHours(0, 0, 0, 0),
      getMonday(new Date()).setHours(0, 0, 0, 0),
      setMoodLastWeek,
      feels.lastWeek
    );
    getMoodHistory(firstDayOfLastYearInMillis, firstDayOfYearInMillis, setMoodLastYear, feels.lastYear);
  }, []);

  // Set mood histories that still change when screen is focused on
  useEffect(() => {
    const moodToday = navigation.addListener('focus', () => {
      getMoodHistory(yesterdayEnd, Date.now(), setMoodToday, feels.today);
      getMoodHistory(getMonday(new Date()).setHours(0, 0, 0, 0), new Date(), setMoodThisWeek, feels.thisWeek);
      getMoodHistory(firstDayOfMonth, Date.now(), setMoodThisMonth, feels.thisMonth);
      getMoodHistory(firstDayOfYearInMillis, Date.now(), setMoodThisYear, feels.thisYear);
    });
    return moodToday;
  });

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#def9f4' }}>
      <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Today',
              moodHistoryRange: feels.today,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Today
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodToday.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodToday.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Yesterday',
              moodHistoryRange: feels.yesterday,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Yesterday
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodYesterday.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodYesterday.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This week',
              moodHistoryRange: feels.thisWeek,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodThisWeek.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodThisWeek.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Last week',
              moodHistoryRange: feels.lastWeek,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Last week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodLastWeek.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodLastWeek.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This month',
              moodHistoryRange: feels.thisMonth,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This month
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodThisMonth.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodThisMonth.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'This year',
              moodHistoryRange: feels.thisYear,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          This year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodThisYear.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodThisYear.mood)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text
          onPress={() => {
            navigation.navigate('MoodHistory', {
              moodHistoryParam: 'Last year',
              moodHistoryRange: feels.lastYear,
            });
          }}
          style={{ flex: 5, textAlignVertical: 'center', padding: 5 }}
          variant='headlineMedium'
        >
          Last year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          {moodLastYear.percentage}
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Text style={styles.smiley}>{String.fromCodePoint(moodLastYear.mood)}</Text>
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
