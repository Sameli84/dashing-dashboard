import React from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const MoodWidgetPart = ({ navigation, route }) => {
  return (
    <View style={{ flex: 3 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text
          style={{ flex: 5, textAlignVertical: 'center', paddingLeft: 7 }}
          variant='headlineLarge'
          onPress={() => {
            if (route.name == 'Dashboard') {
              navigation.navigate('Mood');
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
                navigation.navigate('Dashboard');
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
            &#128525;
          </Text>
        </View>
        <View style={{ flex: 3, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#128512;</Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#128528;</Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#128546;</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#128525;</Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#129395;</Text>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.smiley}>&#128545;</Text>
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
