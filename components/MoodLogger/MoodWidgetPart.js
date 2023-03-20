import { React, useState, useEffect, useRef } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const MoodWidgetPart = ({ navigation, route }) => {
  const [mood, setMood] = useState('0x1F600');

  useEffect(() => {
    const keepEmojiState = navigation.addListener('focus', () => {
      // Screen was focused
      if (route.params) {
        setMood(route.params.moodParam);
      }
    });
    return keepEmojiState;
  });

  return (
    <View style={{ flex: 3 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text
          style={{ flex: 5, textAlignVertical: 'center', paddingLeft: 7 }}
          variant='headlineLarge'
          onPress={() => {
            if (route.name == 'Dashboard') {
              navigation.navigate('Mood', {
                moodParam: mood,
              });
            }
          }}
        >
          My Mood
        </Text>
        {route.name == 'Mood' && (
          <Ionicons
            size={58}
            name='arrow-back-circle-outline'
            style={{ flex: 1 }}
            title='Back'
            onPress={() => {
              if (route.name == 'Mood') {
                navigation.navigate('Dashboard', {
                  moodParam: mood,
                });
              }
            }}
          ></Ionicons>
        )}
      </View>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 2, padding: 5, overflow: 'hidden' }}>
          <Text
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 15,
              backgroundColor: '#333333',
              fontSize: 80,
              textAlignVertical: 'center',
              textAlign: 'center',
            }}
          >
            {String.fromCodePoint(mood)}
          </Text>
        </View>
        <View style={{ flex: 3, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F600');
                }}
              >
                &#x1F600;
              </Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F610');
                }}
              >
                &#x1F610;
              </Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F622');
                }}
              >
                &#x1F622;
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F60D');
                }}
              >
                &#x1F60D;
              </Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F973');
                }}
              >
                &#x1F973;
              </Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={styles.smiley}
                onPress={() => {
                  setMood('0x1F621');
                }}
              >
                &#x1F621;
              </Text>
            </View>
          </View>
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
    textAlignVertical: 'top',
    textAlign: 'center',
  },
});

export default MoodWidgetPart;
