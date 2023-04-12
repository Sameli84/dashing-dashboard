import { React, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style'; // feel free to add styles
import MoodWidgetPart from '../MoodLogger/MoodWidgetPart';
import TodoWidgetPart from '../TodoList/TodoWidgetPart';
import Aphorisms from '../Aphorisms/Aphorisms';
import { auth } from '../../config/firebase';
import style from '../../styles/style';

// screens get 'navigation' as prop from context
const ScreenDashboard = ({ navigation, route }) => {
  const [userName, setUserName] = useState('No one');

  // try to set the name after auth but doesn't work atm
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        // display name is not available right after registering
        // need to either delay this or listen for a change in auth database?
        setUserName(auth.currentUser.displayName);
      }
    });
    return unsubscribe; // stop listening
  }, []);

  return (
    <View style={style.containerLeftAligned}>
      <Text variant='headlineLarge'>Hi {userName}!</Text>
      <Text variant='titleLarge'>Widgets</Text>
      <View style={{ flex: 3, marginTop: constants.SPACER_2, width: '100%' }}>
        <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
        <TodoWidgetPart navigation={navigation} route={route}></TodoWidgetPart>
        <Aphorisms></Aphorisms>
      </View>
    </View>
  );
};

export default ScreenDashboard;
