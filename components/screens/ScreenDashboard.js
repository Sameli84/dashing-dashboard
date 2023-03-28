<<<<<<< 98d7702eb4597b6d7bee25905eb1dae3f9e52da3
import { React, useState } from 'react';
=======
import { useEffect } from 'react';
>>>>>>> chore: added get, add and delete functionalities for Todos and Feelings
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style'; // feel free to add styles
import MoodWidgetPart from '../MoodLogger/MoodWidgetPart';
import * as backend from '../backend/backend';

// screens get 'navigation' as prop from context
const ScreenDashboard = ({ navigation, route }) => {
  const userName = 'Test';
<<<<<<< 98d7702eb4597b6d7bee25905eb1dae3f9e52da3
<<<<<<< 614261bb4f6408537818a4698ae44c295e9048cc
=======
  backend.getTodos(); // testing backend layer here
>>>>>>> fix: firestore backend layer works
=======
  useEffect(() => {
    const getData = async () => {
      const feelings = await backend.getFeelingsByDate(new Date('2023-03-27'));
      console.log(feelings[2]);
      await backend.deleteFeeling(new Date('2023-03-27'), feelings[1]);
    };
    getData();
  }, []);
>>>>>>> chore: added get, add and delete functionalities for Todos and Feelings
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#def9f4' }}>
      <Text style={{ flex: 1, textAlignVertical: 'center', paddingLeft: 7 }} variant='headlineLarge'>
        Hi {userName}!
      </Text>
      <Text style={{ flex: 1, textAlignVertical: 'center', paddingLeft: 7 }} variant='titleLarge'>
        Widgets
      </Text>
      <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
      <View style={{ flex: 3 }}></View>
      <View style={{ flex: 3 }}></View>
    </View>
  );
};

export default ScreenDashboard;
